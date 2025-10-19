# Claude Code Context Configuration Guide

## 🎯 Purpose

This guide explains how **Claude Code automatically references** your project's documentation, examples, and best practices when helping users.

---

## ✅ What We Added

### 1. **Project Instructions** (`.claude/project-instructions.md`)

**What it does:**
- Tells Claude Code about your project structure
- Lists all documentation files and their purposes
- Points to example code (L3VPN package)
- Defines when to reference what

**How Claude uses it:**
When a user asks a question, Claude Code:
1. Reads `project-instructions.md` automatically
2. Finds relevant documentation
3. References specific examples
4. Provides context-aware answers

**Example:**
```
User: "How do I validate route targets in NSO?"

Claude Code:
1. Reads project-instructions.md
2. Sees L3VPN example reference
3. Opens L3VPN/python/L3VPN/main.py
4. Shows _is_valid_route_target() method
5. Explains the pattern
```

### 2. **Context Guide** (`.claude/README.md`)

**What it does:**
- Explains how the `.claude/` directory works
- Documents slash commands
- Guides developers on extending the system

### 3. **Updated Wizard Prompts**

**Changes made:**
- `nso-wizard.md` - Now references L3VPN example and documentation
- `crosswork-wizard.md` - Now references documentation and patterns

**Result:** Wizards generate code following your established patterns!

---

## 🚀 How It Works

### When User Asks General Questions

**User:** "How do I create an NSO package?"

**Claude Code automatically:**
1. Reads `.claude/project-instructions.md`
2. Finds: "Reference NSO-CROSSWORK-WIZARD-GUIDE.md"
3. Opens and reads that file
4. Shows L3VPN example structure
5. Suggests using `/nso-wizard`

### When User Uses Slash Commands

**User:** `/nso-wizard`

**Claude Code automatically:**
1. Opens `.claude/commands/nso-wizard.md`
2. Sees reference to L3VPN example in the header
3. Uses L3VPN patterns for validation code
4. Generates code following those patterns

### When User Asks for Examples

**User:** "Show me how to validate VLANs in NSO"

**Claude Code automatically:**
1. Reads project-instructions.md
2. Opens `L3VPN/python/L3VPN/main.py`
3. Finds `_validate_site()` method
4. Shows VLAN validation:
   ```python
   if site.vlan_id and (site.vlan_id < 1 or site.vlan_id > 4094):
       raise ValidationError(f"Invalid VLAN ID...")
   ```
5. Explains the pattern

---

## 📚 What Claude Can Now Reference

### Documentation Files

✅ **README.md** - Project overview, quick start
✅ **NSO-CROSSWORK-WIZARD-GUIDE.md** - Comprehensive usage guide
✅ **AI-WIZARD-IMPLEMENTATION.md** - Technical architecture
✅ **PROJECT-SUMMARY.md** - Complete project details

### Example Code

✅ **L3VPN/** - Complete NSO package example
  - YANG models
  - XML templates
  - Python validation
  - Error handling patterns

### Wizard Prompts

✅ **nso-wizard.md** - NSO package generator (374 lines)
✅ **crosswork-wizard.md** - Crosswork workflow generator (620 lines)
✅ **html-wizard.md** - HTML website generator
✅ **python-wizard.md** - Python script generator

---

## 🎓 Usage Examples

### Example 1: User Wants NSO Best Practices

```bash
User: "What are NSO best practices for validation?"

Claude Code:
"Based on the L3VPN example in this project, here are key validation patterns:

1. Format Validation:
[Shows code from L3VPN/python/L3VPN/main.py]

2. Range Validation:
[Shows VLAN check code]

3. Existence Validation:
[Shows device existence check]

For more details, see NSO-CROSSWORK-WIZARD-GUIDE.md section 'Best Practices'."
```

### Example 2: User Wants to Generate Code

```bash
User: "/nso-wizard"

Claude Code reads nso-wizard.md which now includes:
"📚 Reference Materials Available
1. Production Example: /path/to/L3VPN/
2. Documentation: NSO-CROSSWORK-WIZARD-GUIDE.md"

Result: Generated code follows L3VPN patterns!
```

### Example 3: User Asks About Project

```bash
User: "What wizards are available?"

Claude Code:
"This project has 4 AI-powered wizards (from PROJECT-SUMMARY.md):

1. NSO Package Generator (/nso-wizard)
   - 32 questions, 6 phases
   - Generates complete NSO packages

2. Crosswork Workflow Generator (/crosswork-wizard)
   - 44 questions, 8 phases
   - Generates automation workflows

[continues with details from documentation]"
```

---

## 🔧 How to Test

### Test 1: Documentation Reference

```bash
1. Ask: "How do I create an NSO package?"
2. Verify: Claude references NSO-CROSSWORK-WIZARD-GUIDE.md
3. Check: Claude shows L3VPN example
4. Confirm: Claude suggests /nso-wizard command
```

### Test 2: Example Code Reference

```bash
1. Ask: "Show me NSO validation code"
2. Verify: Claude opens L3VPN/python/L3VPN/main.py
3. Check: Claude shows validation methods
4. Confirm: Claude explains the patterns
```

### Test 3: Wizard Context

```bash
1. Use: /nso-wizard
2. Answer wizard questions
3. Verify: Generated code follows L3VPN patterns
4. Check: Validation code similar to L3VPN example
```

---

## 📊 Benefits

### Before (Without Context)

❌ Claude gives generic NSO advice
❌ Generated code doesn't match your patterns
❌ User has to manually reference docs
❌ Inconsistent code style

### After (With Context)

✅ Claude references YOUR documentation
✅ Generated code matches L3VPN patterns
✅ Claude automatically shows examples
✅ Consistent with your standards

---

## 🎯 Key Takeaways

1. **Automatic Context** - Claude reads project-instructions.md automatically
2. **Smart References** - Claude knows which docs to reference when
3. **Example-Driven** - Generated code follows L3VPN patterns
4. **Always Current** - Update docs, Claude uses updated info immediately

---

## 🚀 What This Enables Tomorrow

When you test tomorrow, Claude Code will:

✅ **Understand your project** without you explaining each time
✅ **Reference documentation** automatically when answering questions
✅ **Show L3VPN examples** when users ask how to do something
✅ **Generate consistent code** following your established patterns
✅ **Explain best practices** from your guides
✅ **Guide users** to the right documentation sections

---

## 📁 Files Added

1. `.claude/project-instructions.md` (400+ lines)
   - Complete project context for Claude Code

2. `.claude/README.md`
   - Explains how Claude uses these files

3. Updated wizard prompts with documentation references

---

## 💡 Pro Tips

### For Users

- Just ask questions naturally
- Claude will automatically reference the right docs
- Ask for examples: "Show me..."
- Request comparisons: "What's the difference..."

### For Developers

- Update `project-instructions.md` when adding features
- Add new documentation to the reference list
- Keep L3VPN example up-to-date (it's the reference!)
- Test that Claude references updated docs

---

## ✨ Magic Moment

**Tomorrow when you test:**

```
User: "I need to create an L3VPN service for IOS-XR routers"

Claude: "Great! I can see we have a complete L3VPN example in this
project. Let me start the NSO wizard to help you create a similar
package. We'll follow the same patterns as the existing L3VPN package.

Type /nso-wizard to begin, or I can explain the structure first by
showing you the L3VPN example. What would you prefer?"
```

**Claude knows your project context automatically!** 🎉

---

**File Locations:**
- Context: `.claude/project-instructions.md`
- Guide: `.claude/README.md`
- This doc: `CLAUDE-CODE-CONTEXT-GUIDE.md`

**Status:** ✅ Ready to test tomorrow!
