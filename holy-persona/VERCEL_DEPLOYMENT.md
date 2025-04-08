# Vercel Deployment Setup

This document provides instructions on how to set up automatic deployment with Vercel for the Holy Persona project.

## Prerequisites

1. A GitHub account
2. A Vercel account (you can sign up at [vercel.com](https://vercel.com) using your GitHub account)

## Setup Steps

### 1. Connect Your Repository to Vercel

1. Log in to your Vercel account
2. Click on "Add New" > "Project"
3. Import your GitHub repository
4. Configure your project settings:
   - Framework Preset: Next.js
   - Root Directory: `holy-persona`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### 2. Set Up GitHub Secrets

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Click on "New repository secret"
4. Add the following secret:
   - Name: `VERCEL_TOKEN`
   - Value: Your Vercel API token (you can generate this in your Vercel account settings)

### 3. Configure Branch Deployment

1. In your Vercel project settings, go to the "Git" tab
2. Under "Production Branch", select "main"
3. Enable "Auto-Deploy" for the main branch

## How It Works

- When you push to the `main` branch, Vercel will automatically detect the changes
- The GitHub Actions workflow will trigger the deployment process
- Your site will be automatically deployed to Vercel's production environment

## Troubleshooting

If you encounter any issues with the deployment:

1. Check the GitHub Actions logs for errors
2. Verify that your Vercel token is correctly set in GitHub secrets
3. Ensure your repository has the correct permissions for Vercel

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions) 