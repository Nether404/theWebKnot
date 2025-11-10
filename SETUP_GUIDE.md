# WebKnot Setup Guide

Complete guide to set up WebKnot with Supabase database and Gemini AI integration.

## Prerequisites

- Node.js 20+ and npm installed
- A Supabase account ([supabase.com](https://supabase.com))
- A Google AI API key for Gemini ([aistudio.google.com](https://aistudio.google.com/app/apikey))

## Step 1: Clone and Install

```bash
git clone <your-repo-url>
cd webknot
npm install
```

## Step 2: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Update `.env` with your credentials:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini AI Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key

# Feature Flags
VITE_AI_ENABLED=true
VITE_AI_RATE_LIMIT=20
```

## Step 3: Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project or select an existing one
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

**✅ Database schema is already created!** The app automatically creates all necessary tables and RLS policies on first run.

## Step 4: Get Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Get API key"** or **"Create API key"**
4. Copy the key → `VITE_GEMINI_API_KEY`

## Step 5: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Step 6: Test the Setup

### Test Authentication
1. Click **"Sign Up"** in the top right
2. Create a new account
3. Verify the user appears in Supabase dashboard → **Authentication** → **Users**

### Test Database
1. Create a project in the wizard
2. Check Supabase dashboard → **Table Editor** → **projects** table
3. Your project should appear there

### Test AI Features
1. In the Project Setup step, enter a description
2. AI should analyze it and provide suggestions
3. Check Supabase dashboard → **Table Editor** → **ai_usage** table
4. Usage should be tracked

## Database Schema

The following tables are automatically created:

### `users`
User profiles with subscription tiers and AI quotas
- Links to Supabase auth.users
- Tracks AI usage limits

### `projects`
User project configurations and generated prompts
- Stores complete wizard state
- Supports favorites

### `ai_usage`
Tracks all AI feature usage
- Records tokens, response time, success/failure
- Used for analytics and quota management

## Features by Tier

### Free Tier
- 20 AI requests per month
- Unlimited projects
- All wizard features
- Local storage sync

### Premium Tier (Coming Soon)
- 200 AI requests per month
- Priority AI processing
- Advanced analytics
- Team sharing

### Enterprise Tier (Coming Soon)
- Unlimited AI requests
- Custom integrations
- Dedicated support
- SSO authentication

## API Services

The app includes these service layers:

- **AuthService** - User authentication and profile management
- **ProjectService** - CRUD operations for projects
- **AIUsageService** - Track and monitor AI usage
- **GeminiService** - Core AI functionality
- **GeminiServiceWrapper** - Adds usage tracking to AI calls

## Troubleshooting

### "Invalid API key" error
- Verify your Gemini API key starts with `AIza`
- Check for extra spaces in `.env` file
- Restart the dev server after changing `.env`

### "Missing Supabase environment variables" error
- Ensure both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart the dev server

### Authentication not working
- Check Supabase dashboard → **Authentication** → **Providers**
- Ensure "Email" provider is enabled
- Check browser console for detailed errors

### AI quota exceeded
- Check your current usage in user menu → **Usage & Analytics**
- Reset monthly quota or upgrade tier
- Default free tier limit is 20 requests/month

## Development

### Build for Production
```bash
npm run build
```

### Run Tests
```bash
npm test
```

### Type Check
```bash
npm run type-check
```

## Migration from LocalStorage

Existing projects stored in localStorage will remain accessible. To migrate them to the database:

1. Sign in or create an account
2. Your projects will automatically sync to the database
3. LocalStorage is kept as a fallback for offline use

## Security Notes

- All API keys should be kept secret
- Never commit `.env` file to version control
- Row Level Security (RLS) is enabled on all tables
- Users can only access their own data
- Authentication is required for AI features

## Support

For issues or questions:
- Check the [FAQ](./docs/guides/FAQ.md)
- Read the [User Guide](./docs/guides/USER_GUIDE.md)
- Review the [Troubleshooting Guide](./docs/guides/TROUBLESHOOTING.md)

## Next Steps

1. Customize AI quotas per tier in database
2. Set up email templates in Supabase
3. Configure custom domain
4. Enable additional auth providers (Google, GitHub, etc.)
5. Set up monitoring and analytics

Happy building! 🚀
