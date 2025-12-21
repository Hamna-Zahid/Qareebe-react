# GitHub Deployment Guide

## Git is Not Installed

Git is not currently installed on your system. Here are your options:

---

## Option 1: Install Git (Recommended)

### Step 1: Download and Install Git
1. Go to https://git-scm.com/download/win
2. Download the installer
3. Run the installer (use default settings)
4. Restart your terminal/VS Code after installation

### Step 2: Configure Git
Open a new terminal and run:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Initialize and Push to GitHub

```bash
# Navigate to your project
cd d:\Qareebe-react

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Qareebe e-commerce platform"

# Create a new repository on GitHub (do this first on github.com)
# Then link it:
git remote add origin https://github.com/YOUR_USERNAME/qareebe-react.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Option 2: Use GitHub Desktop (Easiest)

### Step 1: Download GitHub Desktop
1. Go to https://desktop.github.com/
2. Download and install

### Step 2: Publish to GitHub
1. Open GitHub Desktop
2. Click "Add" → "Add Existing Repository"
3. Browse to `d:\Qareebe-react`
4. Click "Publish repository"
5. Choose repository name and visibility (public/private)
6. Click "Publish"

Done! Your code is now on GitHub.

---

## Option 3: Manual Upload via GitHub Website

### Step 1: Create Repository
1. Go to https://github.com/new
2. Repository name: `qareebe-react`
3. Description: "Hyperlocal fashion e-commerce platform"
4. Choose Public or Private
5. Click "Create repository"

### Step 2: Upload Files
1. On the repository page, click "uploading an existing file"
2. Drag and drop your entire `Qareebe-react` folder
3. **IMPORTANT**: Delete `server/.env` before uploading (contains your MongoDB password!)
4. Add commit message: "Initial commit"
5. Click "Commit changes"

---

## Important: Protect Your Secrets

Before pushing to GitHub, make sure:

✅ `.gitignore` file exists (already created)
✅ `server/.env` is NOT uploaded (contains MongoDB credentials)
✅ `.env` files are listed in `.gitignore`

The `.gitignore` file I created will automatically exclude:
- `node_modules/`
- `.env` files
- Build folders
- Logs

---

## After Pushing to GitHub

### Clone on Another Machine
```bash
git clone https://github.com/YOUR_USERNAME/qareebe-react.git
cd qareebe-react
npm install
cd server
npm install
```

### Set Up Environment Variables
Create `server/.env` with:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

---

## Recommended: Use GitHub Desktop

For the easiest experience, I recommend **GitHub Desktop**:
- No command line needed
- Visual interface
- Easy to commit and push changes
- Download: https://desktop.github.com/

---

## Need Help?

If you encounter any issues:
1. Make sure Git is installed: `git --version`
2. Check GitHub authentication
3. Verify repository URL is correct

**Next Steps:**
1. Install Git or GitHub Desktop
2. Create a GitHub repository
3. Push your code
4. Share the repository link!
