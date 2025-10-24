// Fallback authentication using direct API calls
const SUPABASE_URL = 'https://zvacorxebezndxsukrlt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2YWNvcnhlYmV6bmR4c3Vrcmx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMjg1ODksImV4cCI6MjA3NjkwNDU4OX0.RvthzYND4sfBzhtZ_bWZ3XbG16r3PZCliDiGfuhq1v8';

export const directAuth = {
  async signIn(email: string, password: string) {
    try {
      const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password.trim()
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || errorData.error_description || 'Authentication failed');
      }

      const data = await response.json();
      
      // Ensure we have session data
      if (data.user && data.access_token && !data.session) {
        data.session = {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          user: data.user
        };
      }
      
      return {
        data,
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error
      };
    }
  },

  async getProfile(userId: string, accessToken: string) {
    try {
      // Add timeout to prevent hanging
      const fetchPromise = fetch(`${SUPABASE_URL}/rest/v1/profiles?id=eq.${userId}`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Profile fetch timeout')), 5000)
      );
      
      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Profile fetch failed');
      }

      const data = await response.json();
      
      return {
        data: data[0] || null, // Return first profile or null
        error: null
      };
    } catch (error) {
      return {
        data: null,
        error
      };
    }
  },

  async signOut(accessToken: string) {
    try {
      // Add timeout to prevent hanging
      const fetchPromise = fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Logout timeout')), 5000)
      );
      
      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;
      
      // Even if the API call fails, we should still clear local state
      return {
        success: true,
        error: null
      };
    } catch (error) {
      // Always return success for logout to ensure local state is cleared
      return {
        success: true,
        error: null
      };
    }
  }
};
