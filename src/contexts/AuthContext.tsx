import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/services/supabaseClient';
import { directAuth } from '@/services/authFallback';

// Keep the existing User shape expected across the app
export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	fullName: string;
	avatar?: string;
	role: string;
	isEmailVerified: boolean;
	lastLogin?: string;
	createdAt: string;
	updatedAt?: string;
}

export interface RegisterData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
	register: (userData: RegisterData) => Promise<boolean>;
	logout: () => void;
	updateUser: (userData: Partial<User>) => Promise<void>;
	isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}

// Map Supabase auth user + optional profile row to our app User
function mapToAppUser(authUser: any, profile: any | null): User {
	const firstName = profile?.first_name || profile?.firstName || authUser?.user_metadata?.first_name || '';
	const lastName = profile?.last_name || profile?.lastName || authUser?.user_metadata?.last_name || '';
	const email = authUser?.email || profile?.email || '';
	const fullName = `${firstName} ${lastName}`.trim();
	return {
		id: authUser.id,
		firstName,
		lastName,
		email,
		fullName,
		avatar: profile?.avatar_url || profile?.avatar || undefined,
		role: profile?.role || authUser?.role || 'user',
		isEmailVerified: !!authUser?.email_confirmed_at,
		lastLogin: new Date().toISOString(),
		createdAt: authUser?.created_at,
		updatedAt: profile?.updated_at || undefined,
	};
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	
	// Memoize isAdmin to prevent unnecessary re-renders
	const isAdmin = useMemo(() => !!user && user.role === 'admin', [user]);

	// On mount, load current session and subscribe to auth state changes
	useEffect(() => {
		let isMounted = true;
		const init = async () => {
			try {
				setIsLoading(true);
				
				// First, check for stored session data
				const storedUserData = localStorage.getItem('user_data');
				const storedToken = localStorage.getItem('supabase_auth_token');
				
				if (storedUserData && storedToken) {
					try {
						const userData = JSON.parse(storedUserData);
						// Verify token is still valid by fetching profile
						const profileResult = await directAuth.getProfile(userData.id, storedToken);
						if (profileResult.data && !profileResult.error) {
							if (!isMounted) return;
							setUser(userData);
							setIsLoading(false);
							return;
						} else {
							// Token is invalid, clear stored data
							localStorage.removeItem('supabase_auth_token');
							localStorage.removeItem('supabase_refresh_token');
							localStorage.removeItem('user_data');
						}
					} catch (error) {
						// Stored data is corrupted, clear it
						localStorage.removeItem('supabase_auth_token');
						localStorage.removeItem('supabase_refresh_token');
						localStorage.removeItem('user_data');
					}
				}
				
				// Fallback to Supabase client session check
				const { data: { session } } = await supabase.auth.getSession();
				if (session?.user) {
					const authUser = session.user;
					const { data: profile } = await supabase
						.from('profiles')
						.select('*')
						.eq('id', authUser.id)
						.maybeSingle();
					if (!isMounted) return;
					setUser(mapToAppUser(authUser, profile));
				} else {
					setUser(null);
				}
			} catch (error) {
				// Auth init failed silently
			} finally {
				if (isMounted) setIsLoading(false);
			}
		};
		init();

		const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
			if (!session?.user) {
				setUser(null);
				// Clear stored data when session is lost
				localStorage.removeItem('supabase_auth_token');
				localStorage.removeItem('supabase_refresh_token');
				localStorage.removeItem('user_data');
				return;
			}
			const { data: profile } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', session.user.id)
				.maybeSingle();
			const appUser = mapToAppUser(session.user, profile);
			setUser(appUser);
			
			// Store session data for persistence
			if (session.access_token && session.refresh_token) {
				localStorage.setItem('supabase_auth_token', session.access_token);
				localStorage.setItem('supabase_refresh_token', session.refresh_token);
				localStorage.setItem('user_data', JSON.stringify(appUser));
			}
		});

		return () => {
			isMounted = false;
			listener.subscription.unsubscribe();
		};
	}, []);

	const login = useCallback(async (email: string, password: string, rememberMe: boolean = true): Promise<boolean> => {
		try {
			setIsLoading(true);
			const normalizedEmail = email.trim().toLowerCase();
			const pwd = password.trim();
			
			// Use direct API approach for reliable authentication
			const fallbackResult = await directAuth.signIn(normalizedEmail, pwd);
			let data = fallbackResult.data;
			let error = fallbackResult.error;
			
			if (error) {
				// Only treat as connection error if it's actually a network issue
				if (error.message?.includes('Failed to fetch') || 
					error.message?.includes('NetworkError') ||
					error.message?.includes('fetch') ||
					error.message?.includes('timeout') ||
					error.message?.includes('ERR_NETWORK') ||
					error.message?.includes('ERR_INTERNET_DISCONNECTED') ||
					error.message?.includes('Authentication timeout')) {
					throw new Error('Unable to connect to server. Please check your internet connection and ensure Supabase is active.');
				}
				// For all other errors, pass them through as-is
				throw error;
			}
			
			if (!data.user) {
				throw new Error('No user returned from authentication');
			}
			
			// Fetch profile data using direct API
			let profile = null;
			if (data.access_token) {
				const profileResult = await directAuth.getProfile(data.user.id, data.access_token);
				if (profileResult.data && !profileResult.error) {
					profile = profileResult.data;
				}
				// Continue with login even if profile fetch fails
			}
			
			const appUser = mapToAppUser(data.user, profile);
			setUser(appUser);
			
			// Store session data for persistence (only if rememberMe is true)
			if (rememberMe && data.access_token && data.refresh_token) {
				localStorage.setItem('supabase_auth_token', data.access_token);
				localStorage.setItem('supabase_refresh_token', data.refresh_token);
				localStorage.setItem('user_data', JSON.stringify(appUser));
			} else if (!rememberMe) {
				// Clear any existing stored data if rememberMe is false
				localStorage.removeItem('supabase_auth_token');
				localStorage.removeItem('supabase_refresh_token');
				localStorage.removeItem('user_data');
			}
			
			toast({
				title: 'Welcome back!',
				description: `Hello ${profile?.first_name || data.user.email}, you're successfully logged in.`,
			});
			return true;
		} catch (error: any) {
			let errorMessage = error?.message || 'Invalid email or password';
			
			// Provide helpful error messages
			if (errorMessage.includes('Invalid login credentials')) {
				errorMessage = 'Invalid email or password. Please check your credentials.';
			} else if (errorMessage.includes('Email not confirmed')) {
				errorMessage = 'Please verify your email before logging in. Check your inbox.';
			} else if (errorMessage.includes('Too many requests')) {
				errorMessage = 'Too many login attempts. Please wait a moment and try again.';
			} else if (errorMessage.includes('User not found')) {
				errorMessage = 'No account found with this email address.';
			} else if (errorMessage.includes('connect to server') || errorMessage.includes('fetch') || errorMessage.includes('timeout')) {
				errorMessage = 'Cannot connect to Supabase. Please ensure your project is active.';
			}
			
			toast({
				title: 'Login failed',
				description: errorMessage,
				variant: 'destructive',
			});
			return false;
		} finally {
			setIsLoading(false);
		}
	}, []);

	const register = useCallback(async (userData: RegisterData): Promise<boolean> => {
		try {
			setIsLoading(true);
			const { firstName, lastName, email, password } = userData;
			const normalizedEmail = email.trim().toLowerCase();
			const redirectTo = (import.meta.env.VITE_SITE_URL as string) || undefined;
			
			// Use Supabase client for registration (usually works fine)
			const { data, error } = await supabase.auth.signUp({
				email: normalizedEmail,
				password,
				options: {
					data: { first_name: firstName, last_name: lastName },
					...(redirectTo ? { emailRedirectTo: redirectTo } : {}),
				},
			});
			
			if (error) {
				// Only treat as connection error if it's actually a network issue
				if (error.message?.includes('Failed to fetch') || 
					error.message?.includes('NetworkError') ||
					error.message?.includes('fetch') ||
					error.message?.includes('timeout') ||
					error.message?.includes('ERR_NETWORK') ||
					error.message?.includes('ERR_INTERNET_DISCONNECTED')) {
					throw new Error('Unable to connect to server. Please check your internet connection and ensure Supabase is active.');
				}
				// For all other errors, pass them through as-is
				throw error;
			}
			
			if (!data.user) throw new Error('Registration failed - no user returned');
			
			// Wait for profile to be created by database trigger
			let profile: any | null = null;
			for (let i = 0; i < 10; i++) {
				const { data: p, error: pErr } = await supabase
					.from('profiles')
					.select('*')
					.eq('id', data.user.id)
					.maybeSingle();
				if (pErr) break;
				if (p) { profile = p; break; }
				await new Promise((r) => setTimeout(r, 300));
			}
			
			setUser(mapToAppUser(data.user, profile || { first_name: firstName, last_name: lastName, email: normalizedEmail }));
			
			if (!data.session) {
				toast({
					title: 'Confirm your email',
					description: 'We sent you a confirmation link. Please check your inbox to verify your account.',
				});
			} else {
				toast({
					title: 'Account created successfully!',
					description: `Welcome to Aero Car Store, ${firstName}!`,
				});
			}
			return true;
		} catch (error: any) {
			let errorMessage = error?.message || 'Failed to create account';
			
			// Provide helpful error messages
			if (errorMessage.includes('User already registered')) {
				errorMessage = 'An account with this email already exists. Please login instead.';
			} else if (errorMessage.includes('Password should be at least')) {
				errorMessage = 'Password is too weak. Please use at least 6 characters.';
			} else if (errorMessage.includes('connect to server') || errorMessage.includes('fetch')) {
				errorMessage = 'Cannot connect to Supabase. Please ensure your project is active.';
			}
			
			toast({
				title: 'Registration failed',
				description: errorMessage,
				variant: 'destructive',
			});
			return false;
		} finally {
			setIsLoading(false);
		}
	}, []);

	const logout = useCallback(async () => {
		// Always clear local state immediately for responsive UI
		setUser(null);
		
		// Clear stored session data
		localStorage.removeItem('supabase_auth_token');
		localStorage.removeItem('supabase_refresh_token');
		localStorage.removeItem('user_data');
		
		try {
			// Try to get current session for logout with timeout
			const sessionPromise = supabase.auth.getSession();
			const timeoutPromise = new Promise((_, reject) => 
				setTimeout(() => reject(new Error('Session timeout')), 3000)
			);
			
			const { data: session } = await Promise.race([sessionPromise, timeoutPromise]) as any;
			
			if (session?.session?.access_token) {
				// Use direct API logout with timeout protection
				await directAuth.signOut(session.session.access_token);
			}
		} catch (error) {
			// Ignore logout API errors - local state is already cleared
		}
		
		// Show success message
		toast({
			title: 'Logged out successfully',
			description: 'You have been logged out of your account.',
		});
	}, []);

	const updateUser = useCallback(async (userData: Partial<User>) => {
		try {
			if (!user) return;
			const updatePayload: any = {
				updated_at: new Date().toISOString(),
			};
			if (userData.firstName !== undefined) updatePayload.first_name = userData.firstName;
			if (userData.lastName !== undefined) updatePayload.last_name = userData.lastName;
			if (userData.avatar !== undefined) updatePayload.avatar_url = userData.avatar;
			if (userData.email && userData.email !== user.email) {
				const { error: emailErr } = await supabase.auth.updateUser({ email: userData.email });
				if (emailErr) throw emailErr;
			}
			const { data, error } = await supabase
				.from('profiles')
				.upsert({ id: user.id, ...updatePayload })
				.select('*')
				.maybeSingle();
			if (error) throw error;
			setUser(mapToAppUser({ ...user, email: userData.email ?? user.email }, data));
		} catch (error: any) {
			toast({
				title: 'Update failed',
				description: error?.message || 'Failed to update profile',
				variant: 'destructive',
			});
			throw error;
		}
	}, [user]);

	const value: AuthContextType = useMemo(() => ({
		user,
		isLoading,
		login,
		register,
		logout,
		updateUser,
		isAdmin,
	}), [user, isLoading, login, register, logout, updateUser, isAdmin]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};
