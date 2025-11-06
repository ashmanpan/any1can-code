# Testing CLAUDE.md Integration

## Purpose
This document explains how to test that CLAUDE.md is being read and applied by Claude Code.

## Test Scenarios

### Test 1: Verify Claude Reads CLAUDE.md on Startup

**Steps:**
1. Open terminal in repository root: `cd /home/kpanse/wsl-myprojects/any1can-code`
2. Start claude-code-webui (backend + frontend)
3. Open chat interface at http://localhost:3000
4. Ask Claude: "What documentation should you use for NSO code generation?"

**Expected Response:**
Claude should mention:
- Only Cisco official documentation
- developer.cisco.com/site/nso/
- Should NOT mention third-party sources

**This proves:** Claude read CLAUDE.md section "MANDATORY: Use Only Cisco Official Documentation"

---

### Test 2: Verify NSO Wizard Uses System Prompt

**Steps:**
1. In chat interface, click the floating wizard button (cyan/blue gradient)
2. Click "Cisco NSO Package Generator" card
3. Observe Claude's first message

**Expected Response:**
Claude should:
- Greet as "Cisco NSO expert and automation architect"
- Ask: "What is the service package name?"
- Suggest format: "lowercase-with-hyphens"
- Mention it will ask questions step-by-step

**This proves:** Claude loaded the NSO wizard system prompt from CLAUDE.md

---

### Test 3: Verify Code Quality Rules Applied

**Steps:**
1. Continue NSO wizard conversation through all questions
2. When Claude generates YANG model, examine the code

**Expected Code Quality:**
✅ Uses proper types: `type inet:ipv4-address;` (NOT `type string;`)
✅ Uses leafref for devices: `type leafref { path "/ncs:devices/ncs:device/ncs:name"; }`
✅ Includes validation patterns: `type string { pattern '[0-9]+:[0-9]+'; }`
✅ Python has ValidationError exception class
✅ Python has _validate_service_data() function
✅ XML template has conditionals: `<?if condition?>`

**This proves:** Claude applied code generation rules from CLAUDE.md

---

### Test 4: Verify L3VPN Example Reference

**Steps:**
1. Ask Claude: "Show me an example of NSO package validation"
2. Or: "What's the correct pattern for YANG leafref to devices?"

**Expected Response:**
Claude should:
- Reference the L3VPN example at `/home/kpanse/wsl-myprojects/any1can-code/L3VPN/`
- Show code snippets from L3VPN files
- Explain patterns used in the example

**This proves:** Claude knows about and can reference local L3VPN example

---

### Test 5: Verify Crosswork Wizard

**Steps:**
1. Click wizard button
2. Select "Crosswork Workflow Generator"
3. Observe first message

**Expected Response:**
Claude should:
- Introduce as "Cisco Crosswork Network Automation expert"
- Ask: "What is the workflow name?"
- Mention 44 questions across 8 phases
- Reference Crosswork documentation

**This proves:** Claude loaded Crosswork wizard system prompt

---

### Test 6: Verify Cisco Docs Only (Negative Test)

**Steps:**
1. Ask Claude: "Can you search the internet for NSO examples?"
2. Or: "Find some blog posts about NSO development"

**Expected Response:**
Claude should:
- Decline to search the internet
- Mention it uses ONLY Cisco official documentation
- Offer to use the L3VPN example instead
- Reference developer.cisco.com

**This proves:** Claude respects the "MANDATORY: Use Only Cisco Official Documentation" rule

---

## Quick Verification Commands

Run these in the repository to verify files are in place:

```bash
# Check CLAUDE.md exists and has content
ls -lh /home/kpanse/wsl-myprojects/any1can-code/CLAUDE.md
wc -l /home/kpanse/wsl-myprojects/any1can-code/CLAUDE.md

# Check .claude/project-instructions.md references CLAUDE.md
grep -n "CLAUDE.md" /home/kpanse/wsl-myprojects/any1can-code/.claude/project-instructions.md

# Check L3VPN example exists
ls -R /home/kpanse/wsl-myprojects/any1can-code/L3VPN/

# Check wizard component has system prompts
grep -n "systemPrompt" /home/kpanse/wsl-myprojects/any1can-code/claude-code-webui/frontend/src/components/ConversationalWizard.tsx
```

---

## Success Criteria

All 6 tests should pass, proving:
✅ Claude automatically reads CLAUDE.md
✅ Wizard system prompts are applied
✅ Code generation rules are followed
✅ Only Cisco official docs are referenced
✅ L3VPN example is used as pattern
✅ Quality standards are maintained

---

## Troubleshooting

### If Claude doesn't seem to read CLAUDE.md:

1. **Verify file location:**
   ```bash
   pwd  # Should be /home/kpanse/wsl-myprojects/any1can-code
   ls CLAUDE.md  # Should exist
   ```

2. **Check file permissions:**
   ```bash
   ls -l CLAUDE.md  # Should be readable (r)
   ```

3. **Restart Claude Code:**
   - Stop backend and frontend
   - Restart both
   - Claude re-reads CLAUDE.md on startup

4. **Check working directory:**
   - Ensure Claude Code is invoked from the repo root
   - Not from a subdirectory

### If wizard doesn't start properly:

1. **Check ConversationalWizard.tsx:**
   ```bash
   grep "conversationalWizardPrompts" claude-code-webui/frontend/src/components/ConversationalWizard.tsx
   ```

2. **Check browser console for errors:**
   - Open Developer Tools (F12)
   - Look for JavaScript errors

3. **Verify backend is running:**
   ```bash
   curl http://localhost:8080/api/projects
   ```

---

## Notes

- **CLAUDE.md is read automatically** - no user action needed
- **File is part of the repository** - cloning gets it
- **Updates to CLAUDE.md** require restarting Claude Code to reload
- **Multiple instruction files work together:**
  - CLAUDE.md (main instructions)
  - .claude/project-instructions.md (file references)
  - Wizard system prompts (in ConversationalWizard.tsx)

---

**Created:** 2025-11-06
**Purpose:** Test and verify CLAUDE.md integration with Claude Code
