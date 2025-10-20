# Supabase Setup Guide for Aero Car Store

## 🚀 Quick Setup (5 minutes)

### Step 1: Restore Your Supabase Project

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Log in with your account

2. **Find Your Project**
   - Project ID: `ilsdfangzmyxtofidjii`
   - Project URL: `https://ilsdfangzmyxtofidjii.supabase.co`

3. **Resume/Unpause Project** (if needed)
   - If your project shows "Paused", click **"Resume Project"**
   - Wait 2-3 minutes for the project to become active
   - The project auto-pauses after 7 days of inactivity on free tier

### Step 2: Run Database Setup Script

1. **Open SQL Editor**
   - In your Supabase dashboard, go to **SQL Editor** (left sidebar)
   - Click **"New query"**

2. **Copy and Run the Setup Script**
   - Open the file `supabase_setup.sql` in this project
   - Copy all the SQL code
   - Paste it into the SQL Editor
   - Click **"Run"** or press `Ctrl+Enter`

3. **Verify Setup**
   - Go to **Table Editor** (left sidebar)
   - You should see a new `profiles` table
   - Check that it has columns: id, first_name, last_name, email, avatar_url, role, created_at, updated_at

### Step 3: Configure Authentication

1. **Enable Email Auth**
   - Go to **Authentication** → **Providers** (left sidebar)
   - Make sure **Email** is enabled
   - Configure email templates if needed

2. **Configure Email Settings** (Optional)
   - Go to **Authentication** → **Email Templates**
   - Customize confirmation email if desired
   - For development, you can disable email confirmation:
     - Go to **Authentication** → **Settings**
     - Turn OFF "Enable email confirmations"

3. **Set Site URL** (Important!)
   - Go to **Authentication** → **URL Configuration**
   - Add your site URL: `http://localhost:5173` (for development)
   - Add your production URL when deploying

### Step 4: Update Environment Variables (Optional)

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://ilsdfangzmyxtofidjii.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_SITE_URL=http://localhost:5173
```

Get your anon key from:
- Supabase Dashboard → **Settings** → **API** → **Project API keys** → Copy "anon public"

### Step 5: Disable Demo Mode

Once Supabase is working, clear demo mode:

1. **Open Browser Console** (F12)
2. **Run this command:**
```javascript
localStorage.removeItem('useDemoMode');
localStorage.removeItem('demoUsers');
```
3. **Refresh the page**

Your app will now use real Supabase authentication!

---

## 🧪 Testing

### Test Registration:
1. Go to `/register`
2. Create a new account with:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Password: testpassword123

3. **Check Supabase Dashboard:**
   - Go to **Authentication** → **Users**
   - You should see your new user!
   - Go to **Table Editor** → **profiles**
   - You should see the user's profile data!

### Test Login:
1. Go to `/login`
2. Log in with the credentials you just registered
3. You should be logged in successfully!

---

## 🔍 Troubleshooting

### Issue: "Connection timeout"
**Solution:** Your Supabase project is paused. Resume it from the dashboard.

### Issue: "Failed to create account"
**Solution:** 
1. Check that the `profiles` table exists
2. Check that the trigger `on_auth_user_created` exists
3. Run the setup script again

### Issue: "Invalid email or password"
**Possible causes:**
1. Email confirmation is enabled - check your email for confirmation link
2. Wrong password
3. User doesn't exist - try registering first

### Issue: Still using demo mode
**Solution:**
```javascript
// Open browser console and run:
localStorage.removeItem('useDemoMode');
location.reload();
```

---

## 📊 Database Schema

### `profiles` table:
- `id` (UUID, Primary Key) - References auth.users.id
- `first_name` (TEXT) - User's first name
- `last_name` (TEXT) - User's last name
- `email` (TEXT, UNIQUE) - User's email
- `avatar_url` (TEXT, Optional) - Profile picture URL
- `role` (TEXT) - 'user' or 'admin'
- `created_at` (TIMESTAMP) - Account creation date
- `updated_at` (TIMESTAMP) - Last update date

### Security:
- ✅ Row Level Security (RLS) enabled
- ✅ Users can only edit their own profiles
- ✅ Automatic profile creation on signup
- ✅ Email uniqueness enforced

---

## 🎯 What Happens Now?

Once Supabase is set up:

1. **Registration** → Creates user in `auth.users` + profile in `profiles` table
2. **Login** → Authenticates with Supabase Auth
3. **Data Persistence** → All data stored in Supabase (not localStorage)
4. **Multi-device** → Login from any device with your credentials
5. **Secure** → Industry-standard authentication with RLS

---

## 📝 Next Steps

After setup is complete:
- [ ] Test registration with a new account
- [ ] Test login with the registered account
- [ ] Verify data appears in Supabase dashboard
- [ ] Clear demo mode from localStorage
- [ ] Deploy to production with production Supabase URL

Need help? Check the Supabase documentation: https://supabase.com/docs

