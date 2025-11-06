# Getting Started with Any1Can Code Platform

## ⚠️ IMPORTANT - Directory Structure

When you clone this repository, it creates a directory named `any1can-code`. **You MUST run Claude Code from inside this directory** for all features to work correctly.

---

## ✅ Correct Setup

### Step 1: Clone the Repository

```bash
# From any parent directory (e.g., hackthon, projects, etc.)
cd C:/Users/administrator/hackthon

# Clone the repo
git clone https://github.com/ashmanpan/any1can-code.git
```

**Result:**
```
C:/Users/administrator/hackthon/
└── any1can-code/              ← Repository created here
    ├── CLAUDE.md              ← Main instructions for Claude
    ├── examples/              ← 34+ workflow examples
    ├── tools/                 ← CWM validator
    ├── claude-code-webui/     ← Web application
    └── ... other files
```

### Step 2: IMPORTANT - Change Into the Repository Directory

```bash
# YOU MUST DO THIS!
cd any1can-code
```

**Verify you're in the correct directory:**
```bash
# Windows
cd
# Should show: C:\Users\administrator\hackthon\any1can-code

# Linux/Mac
pwd
# Should show: /path/to/hackthon/any1can-code

# Check CLAUDE.md exists
dir CLAUDE.md     # Windows
ls CLAUDE.md      # Linux/Mac
```

### Step 3: Install Dependencies

```bash
# Still inside any1can-code directory
cd claude-code-webui/backend
npm install

# In new terminal (also from any1can-code directory)
cd claude-code-webui/frontend
npm install
```

### Step 4: Start the Application

```bash
# Terminal 1 - Backend (from any1can-code directory)
cd claude-code-webui/backend
npm run dev

# Terminal 2 - Frontend (from any1can-code directory)
cd claude-code-webui/frontend
npm run dev
```

### Step 5: Open Browser

```
http://localhost:3000
```

---

## ❌ Common Mistakes

### Mistake 1: Running from Parent Directory

```bash
# ❌ WRONG
cd C:/Users/administrator/hackthon
git clone https://github.com/ashmanpan/any1can-code.git
# User stays in hackthon directory
cd claude-code-webui/backend  # ERROR - not found!
```

**Problem**: Claude Code won't find CLAUDE.md and examples because you're in the wrong directory.

**Fix**:
```bash
cd any1can-code  # ✅ Go INTO the cloned directory first!
```

---

### Mistake 2: Wrong Working Directory

```bash
# ❌ WRONG - Starting from parent
C:/Users/administrator/hackthon> npm run dev
# Won't find CLAUDE.md (it's in hackthon/any1can-code/)

# ✅ CORRECT - Starting from repository
C:/Users/administrator/hackthon/any1can-code> cd claude-code-webui/backend
C:/Users/administrator/hackthon/any1can-code/claude-code-webui/backend> npm run dev
```

---

## 🔍 How to Verify Everything is Working

### Check 1: Directory Structure

From the `any1can-code` directory, verify these files exist:

```bash
# Windows
dir CLAUDE.md
dir examples\
dir tools\cwm-validator\

# Linux/Mac
ls CLAUDE.md
ls examples/
ls tools/cwm-validator/
```

**All should exist!** If not, you're in the wrong directory.

### Check 2: Claude Code Finds CLAUDE.md

When you start the application:

1. Open http://localhost:3000
2. Click the wizard button (cyan floating button)
3. Select "Crosswork Workflow Generator"
4. Claude should mention checking 34+ examples

**If Claude doesn't mention examples**, CLAUDE.md is not being read. You're probably in the wrong directory.

### Check 3: Examples Are Available

```bash
# Count workflow files
# Windows
dir /s /b examples\crosswork-workflows\*.json | find /c /v ""

# Linux/Mac
find examples/crosswork-workflows/ -name "*.json" | wc -l

# Should show: 34+
```

---

## 📂 Correct Directory Structure

```
Your Parent Directory (e.g., hackthon, projects, etc.)
│
└── any1can-code/                    ← CLONE CREATES THIS
    │
    ├── CLAUDE.md                    ← Claude reads this (30KB+)
    ├── .claude/
    │   └── project-instructions.md  ← Additional instructions
    │
    ├── examples/                    ← 34+ Production examples
    │   ├── README.md
    │   ├── crosswork-workflows/
    │   │   ├── INDEX.md
    │   │   ├── 1.Direct-NSO-Workflows/
    │   │   ├── 2.CNC-Workflows/
    │   │   ├── 3.Webex_Integration_With_Proxy/
    │   │   ├── 4.Golden_Config/
    │   │   ├── 5.Database_Workflows/
    │   │   ├── cwm-workflows/        ← 14+ workflows
    │   │   └── xr-upgrade-workflows/ ← 11+ workflows
    │   ├── nso-packages/
    │   └── python-scripts/
    │
    ├── tools/
    │   └── cwm-validator/           ← JSON schema validator
    │
    ├── claude-code-webui/           ← Web application
    │   ├── backend/
    │   │   ├── package.json
    │   │   └── ... (backend files)
    │   └── frontend/
    │       ├── package.json
    │       └── ... (frontend files)
    │
    ├── L3VPN/                       ← Legacy NSO example
    ├── README.md                    ← Main documentation
    └── ... (other documentation files)
```

---

## 🎯 Quick Checklist

Before starting the application:

- [ ] Cloned repository: `git clone https://github.com/ashmanpan/any1can-code.git`
- [ ] Changed into directory: `cd any1can-code`
- [ ] Verified CLAUDE.md exists: `ls CLAUDE.md` or `dir CLAUDE.md`
- [ ] Verified examples exist: `ls examples/` or `dir examples\`
- [ ] Installed backend: `cd claude-code-webui/backend && npm install`
- [ ] Installed frontend: `cd claude-code-webui/frontend && npm install`
- [ ] Started backend: `cd claude-code-webui/backend && npm run dev`
- [ ] Started frontend: `cd claude-code-webui/frontend && npm run dev`
- [ ] Opened browser: `http://localhost:3000`

---

## 🆘 Troubleshooting

### Problem: "CLAUDE.md not found"

**Cause**: You're in the wrong directory.

**Solution**:
```bash
# Find where you are
pwd  # or cd on Windows

# Should show: /path/to/any1can-code
# If it shows: /path/to/hackthon
# Then do: cd any1can-code
```

### Problem: "No examples found" or "Can't find workflows"

**Cause**: You're running Claude Code from parent directory.

**Solution**:
```bash
# Always start from repository root
cd any1can-code
# Then start application
cd claude-code-webui/backend && npm run dev
```

### Problem: "Module not found" or "Cannot find package"

**Cause**: Didn't run npm install from correct locations.

**Solution**:
```bash
# From any1can-code directory
cd claude-code-webui/backend
npm install

# From any1can-code directory
cd claude-code-webui/frontend
npm install
```

---

## 💡 Pro Tip: Create a Startup Script

### For Windows (startup.bat)

Create `startup.bat` in the `any1can-code` directory:

```batch
@echo off
echo Starting Any1Can Code Platform...
echo.

echo Starting Backend...
start "Backend" cmd /k "cd claude-code-webui\backend && npm run dev"

timeout /t 5

echo Starting Frontend...
start "Frontend" cmd /k "cd claude-code-webui\frontend && npm run dev"

echo.
echo Open browser to: http://localhost:3000
echo.
pause
```

**Usage**: Double-click `startup.bat`

### For Linux/Mac (startup.sh)

Create `startup.sh` in the `any1can-code` directory:

```bash
#!/bin/bash

echo "Starting Any1Can Code Platform..."
echo ""

echo "Starting Backend..."
cd claude-code-webui/backend
npm run dev &
BACKEND_PID=$!

sleep 5

echo "Starting Frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "Open browser to: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
```

**Usage**:
```bash
chmod +x startup.sh
./startup.sh
```

---

## 📞 Still Having Issues?

If you're still having problems:

1. **Verify directory**: Run `pwd` (Linux/Mac) or `cd` (Windows)
   - Should show path ending in `/any1can-code` or `\any1can-code`

2. **Check files exist**:
   ```bash
   ls -la CLAUDE.md examples/ tools/  # Linux/Mac
   dir CLAUDE.md examples\ tools\     # Windows
   ```

3. **Check repository**: Ensure you cloned correctly
   ```bash
   git remote -v
   # Should show: https://github.com/ashmanpan/any1can-code.git
   ```

4. **Fresh start**:
   ```bash
   # Remove and re-clone
   cd ..
   rm -rf any1can-code  # or rmdir /s any1can-code on Windows
   git clone https://github.com/ashmanpan/any1can-code.git
   cd any1can-code
   ```

---

## ✅ Summary

**The Golden Rule**:
> Always run Claude Code from INSIDE the `any1can-code` directory (not from the parent directory where you cloned it)

**Correct path**:
- ✅ `C:/Users/administrator/hackthon/any1can-code`
- ❌ `C:/Users/administrator/hackthon` (parent - WRONG!)

**When in doubt**: Run `pwd` or `cd` and verify you see `any1can-code` at the end of the path!

---

**Happy Coding!** 🚀
