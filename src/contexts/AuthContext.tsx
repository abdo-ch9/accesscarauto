import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/services/supabaseClient';
import { testAuth, isDemoMode, setDemoMode } from '@/services/authTest';
import type { TestUser } from '@/services/authTest';

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
	login: (email: string, password: string) => Promise<boolean>;
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
	
	const isAdmin = useMemo(() => !!user && user.role === 'admin', [user]);

	// On mount, load current session and subscribe to auth state changes
	useEffect(() => {
		let isMounted = true;
		const init = async () => {
			try {
				setIsLoading(true);
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
				return;
			}
			const { data: profile } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', session.user.id)
				.maybeSingle();
			setUser(mapToAppUser(session.user, profile));
		});

		return () => {
			isMounted = false;
			listener.subscription.unsubscribe();
		};
	}, []);

	const login = useCallback(async (email: string, password: string): Promise<boolean> => {
		try {
			setIsLoading(true);
			let useSupabase = !isDemoMode();
			
			// Test Supabase connection if not in demo mode
			if (useSupabase) {
				try {
					const connectionPromise = supabase.auth.getSession();
					const timeoutPromise = new Promise((_, reject) => 
						setTimeout(() => reject(new Error('Connection timeout')), 1500)
					);
					
					await Promise.race([connectionPromise, timeoutPromise]);
				} catch {
					useSupabase = false;
					setDemoMode(true);
				}
			}
			
			// Use demo authentication if Supabase is unavailable
			if (!useSupabase) {
				const result = await testAuth.login(email, password);
				if (result.success && result.user) {
					const user: User = {
						id: result.user.id,
						firstName: result.user.firstName,
						lastName: result.user.lastName,
						email: result.user.email,
						fullName: result.user.fullName,
						role: result.user.role,
						isEmailVerified: result.user.isEmailVerified,
						lastLogin: new Date().toISOString(),
						createdAt: result.user.createdAt,
					};
					setUser(user);
					toast({
						title: 'Welcome back!',
						description: `Hello ${user.firstName}, you're successfully logged in.`,
					});
					return true;
				} else {
					throw new Error(result.error || 'Login failed');
				}
			}
			
			// Supabase authentication
			const normalizedEmail = email.trim().toLowerCase();
			const pwd = password.trim();
			
			const authPromise = supabase.auth.signInWithPassword({ 
				email: normalizedEmail, 
				password: pwd 
			});
			
			const timeoutPromise = new Promise((_, reject) => 
				setTimeout(() => reject(new Error('Authentication timeout')), 10000)
			);
			
			const { data, error } = await Promise.race([authPromise, timeoutPromise]) as any;
			
			if (error) throw error;
			if (!data.user) throw new Error('No user returned');
			
			const { data: profile } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', data.user.id)
				.maybeSingle();
			
			setUser(mapToAppUser(data.user, profile));
			toast({
				title: 'Welcome back!',
				description: `Hello ${profile?.first_name || data.user.email}, you're successfully logged in.`,
			});
			return true;
		} catch (error: any) {
			toast({
				title: 'Login failed',
				description: error?.message || 'Invalid email or password',
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
			let useSupabase = !isDemoMode();
			
			// Test Supabase connection if not in demo mode
			if (useSupabase) {
				try {
					const connectionPromise = supabase.auth.getSession();
					const timeoutPromise = new Promise((_, reject) => 
						setTimeout(() => reject(new Error('Connection timeout')), 1500)
					);
					
					await Promise.race([connectionPromise, timeoutPromise]);
				} catch {
					useSupabase = false;
					setDemoMode(true);
				}
			}
			
			// Use demo registration if Supabase is unavailable
			if (!useSupabase) {
				const result = await testAuth.register({
					firstName: userData.firstName,
					lastName: userData.lastName,
					email: userData.email,
					password: userData.password
				});
				
				if (result.success && result.user) {
					const user: User = {
						id: result.user.id,
						firstName: result.user.firstName,
						lastName: result.user.lastName,
						email: result.user.email,
						fullName: result.user.fullName,
						role: result.user.role,
						isEmailVerified: result.user.isEmailVerified,
						lastLogin: new Date().toISOString(),
						createdAt: result.user.createdAt,
					};
					setUser(user);
					toast({
						title: 'Account created successfully!',
						description: `Welcome to Aero Car Store, ${userData.firstName}!`,
					});
					return true;
				} else {
					throw new Error(result.error || 'Registration failed');
				}
			}
			
			// Supabase registration
			const { firstName, lastName, email, password } = userData;
			const normalizedEmail = email.trim().toLowerCase();
			const redirectTo = (import.meta.env.VITE_SITE_URL as string) || undefined;
			const { data, error } = await supabase.auth.signUp({
				email: normalizedEmail,
				password,
				options: {
					data: { first_name: firstName, last_name: lastName },
					...(redirectTo ? { emailRedirectTo: redirectTo } : {}),
				},
			});
			
			if (error) throw error;
			if (!data.user) throw new Error('Registration failed');
			
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
					description: 'We sent you a confirmation link. Please verify to finish sign in.',
				});
			} else {
				toast({
					title: 'Account created successfully!',
					description: `Welcome to Aero Car Store, ${firstName}!`,
				});
			}
			return true;
		} catch (error: any) {
			toast({
				title: 'Registration failed',
				description: error?.message || 'Failed to create account',
				variant: 'destructive',
			});
			return false;
		} finally {
			setIsLoading(false);
		}
	}, []);

	const logout = useCallback(async () => {
		try {
			await supabase.auth.signOut();
		} finally {
			setUser(null);
			toast({
				title: 'Logged out successfully',
				description: 'You have been logged out of your account.',
			});
		}
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

	const value = useMemo<AuthContextType>(() => ({
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
