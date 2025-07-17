# API Key Setup Guide

## 🔐 Secure API Key Integration

This project uses OpenAI API and requires secure handling of API keys. Follow these steps to set up your API key safely.

## Quick Setup

1. **Get your OpenAI API Key**
   - Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key (it starts with `sk-`)

2. **Configure Environment Variables**
   - Open the `.env` file in the project root
   - Replace `your_openai_api_key_here` with your actual API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. **Verify Setup**
   - The `.env` file is already excluded from git (check `.gitignore`)
   - Your API key will never be committed to version control
   - The backend server (`server.js`) is already configured to use the environment variable

## Security Best Practices ✅

### ✅ What's Already Implemented
- **Environment Variables**: API key stored in `.env` file
- **Git Exclusion**: `.env` file is in `.gitignore`
- **Server-Side Only**: API calls made from backend, not frontend
- **Error Handling**: Proper error handling in API routes

### ✅ Additional Security Measures
- **API Key Rotation**: Regularly rotate your API keys
- **Rate Limiting**: Consider implementing rate limiting for production
- **CORS Configuration**: Configure CORS for production deployment
- **Environment Separation**: Use different API keys for development/production

## File Structure
```
ai project/
├── .env                 # Your API keys (NEVER commit this)
├── .env.example         # Template file (safe to commit)
├── .gitignore          # Excludes .env from git
├── server.js           # Backend with API integration
└── API_KEY_SETUP.md    # This guide
```

## Troubleshooting

### API Key Not Working?
1. Check that `.env` file is in the project root
2. Verify the API key format (should start with `sk-`)
3. Restart the server after changing `.env`
4. Check server logs for specific error messages

### Environment Variables Not Loading?
1. Ensure `dotenv` package is installed: `npm install dotenv`
2. Verify `require('dotenv').config()` is at the top of `server.js`
3. Check file encoding (should be UTF-8)

## Running the Application

1. **Backend**: 
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Production Deployment

For production deployment:
- Use platform-specific environment variable configuration
- Never deploy `.env` files
- Use secrets management services (AWS Secrets Manager, Azure Key Vault, etc.)
- Set up monitoring and alerting for API usage

## ⚠️ Important Reminders

- **NEVER** commit your `.env` file
- **NEVER** hardcode API keys in your source code
- **NEVER** share API keys in chat, email, or documentation
- **ALWAYS** use environment variables for sensitive data
- **ALWAYS** rotate API keys regularly