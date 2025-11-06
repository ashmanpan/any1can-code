# Backend Logs

## Log Files Location

All logs are written to the `logs/` directory in the backend folder:

```
claude-code-webui/backend/logs/
├── claude-md-copy.log    # CLAUDE.md copy operations
└── errors.log            # All errors
```

## Log Files

### 1. `claude-md-copy.log`
**Purpose**: Tracks all CLAUDE.md copy operations

**Contains**:
- Backend working directory
- Source CLAUDE.md path
- Target directory path
- Success/failure messages
- File existence checks

**Example**:
```
[2025-01-06T10:30:45.123Z] [DEBUG] Backend running from: /home/kpanse/wsl-myprojects/any1can-code/claude-code-webui/backend
[2025-01-06T10:30:45.124Z] [DEBUG] Looking for CLAUDE.md at: /home/kpanse/wsl-myprojects/any1can-code/CLAUDE.md
[2025-01-06T10:30:45.125Z] [INFO] Attempting to copy CLAUDE.md from /home/kpanse/wsl-myprojects/any1can-code/CLAUDE.md to /home/user/project/CLAUDE.md
[2025-01-06T10:30:45.130Z] [INFO] ✅ Successfully copied CLAUDE.md to /home/user/project/CLAUDE.md
```

### 2. `errors.log`
**Purpose**: Tracks all errors in the backend

**Contains**:
- Error messages
- Stack traces
- Error context

**Example**:
```
[2025-01-06T10:30:45.123Z] [ERROR] Source CLAUDE.md not found at /wrong/path/CLAUDE.md
  Error: ENOENT: no such file or directory
  Stack: Error: ENOENT: no such file or directory
    at async access (node:internal/fs/promises:123:45)
```

## How to Share Logs

If you encounter issues with CLAUDE.md copying, share these log files:

1. **Find the logs**:
   ```bash
   cd /home/kpanse/wsl-myprojects/any1can-code/claude-code-webui/backend
   ls -la logs/
   ```

2. **View the logs**:
   ```bash
   cat logs/claude-md-copy.log
   cat logs/errors.log
   ```

3. **Share with support**:
   - Copy and paste the log contents
   - Or share the entire log files

## Log Retention

- Logs are **appended** (not overwritten)
- Logs grow over time
- To clear logs:
  ```bash
  rm -rf logs/
  # Logs will be recreated on next backend start
  ```

## Troubleshooting

### If CLAUDE.md is not copying:

1. **Check the logs**:
   ```bash
   tail -f logs/claude-md-copy.log
   ```

2. **Look for these messages**:
   - `Backend running from:` - Shows where backend is running
   - `Looking for CLAUDE.md at:` - Shows where it's looking for source file
   - `Source CLAUDE.md not found` - Source file doesn't exist
   - `Successfully copied` - Copy succeeded

3. **Common issues**:
   - Source file not found → Check if CLAUDE.md exists in repository root
   - Permission denied → Check file permissions
   - Target directory not found → Check if working directory exists

## Log Format

All logs use ISO 8601 timestamp format:

```
[YYYY-MM-DDTHH:mm:ss.SSSZ] [LEVEL] Message
```

**Levels**:
- `DEBUG` - Detailed debugging information
- `INFO` - General information
- `ERROR` - Errors and failures
