# Claude Code Project Configuration

This directory contains configuration and context for Claude Code when working with the Any1Can Code Platform.

## 📁 Directory Structure

```
.claude/
├── README.md                    # This file
├── project-instructions.md      # Main context for Claude Code
├── commands/                    # Slash commands
│   ├── nso-wizard.md
│   ├── crosswork-wizard.md
│   ├── html-wizard.md
│   └── python-wizard.md
└── settings.json                # Claude Code settings (user-specific)
```

## 🎯 How Claude Code Uses This

### 1. Project Instructions (`project-instructions.md`)
Claude Code **automatically reads** this file to understand:
- What this project does
- Where documentation is located
- What examples to reference
- Best practices to follow
- How to help users

### 2. Slash Commands (`commands/*.md`)
When user types `/nso-wizard`, Claude Code:
- Reads `commands/nso-wizard.md`
- Follows the expert prompt inside
- Asks questions step-by-step
- Generates production-ready code

### 3. Settings (`settings.json`)
User-specific settings (not in git)

## 🚀 Quick Reference

### For Users

**To use wizards:**
```
/nso-wizard       - Create Cisco NSO packages
/crosswork-wizard - Create Crosswork workflows
/html-wizard      - Create HTML websites
/python-wizard    - Create Python scripts
```

**To get help:**
```
Ask Claude: "How do I create an NSO package?"
Ask Claude: "Show me the L3VPN example"
Ask Claude: "Explain the wizard phases"
```

Claude will automatically reference the right documentation!

### For Developers

**To add new slash command:**
1. Create `commands/your-wizard.md`
2. Write expert prompt with phases and questions
3. Test with `/your-wizard`

**To update project context:**
1. Edit `project-instructions.md`
2. Claude Code will use updated context automatically

**To modify existing wizard:**
1. Edit `commands/[name]-wizard.md`
2. Test the changes
3. Update documentation if needed

## 📚 Key Files Claude References

Claude Code knows to reference these automatically:

1. **README.md** - Project overview
2. **NSO-CROSSWORK-WIZARD-GUIDE.md** - Comprehensive usage guide
3. **L3VPN/** - Production example code
4. **PROJECT-SUMMARY.md** - Technical details

## 💡 How It Works

When you ask Claude a question:

1. **Claude reads** `project-instructions.md`
2. **Claude finds** relevant documentation
3. **Claude references** example code (L3VPN)
4. **Claude provides** context-aware answers

Example:
```
You: "How do I validate route targets in NSO?"

Claude:
1. Reads project-instructions.md
2. Finds L3VPN example reference
3. Reads L3VPN/python/L3VPN/main.py
4. Shows you _is_valid_route_target() method
5. Explains the pattern with context
```

## 🎓 Best Practices

### Using Slash Commands
- Start with `/nso-wizard` or `/crosswork-wizard`
- Answer questions naturally
- Ask Claude for clarifications anytime
- Review generated code

### Getting Help
- Be specific: "How do I validate VLANs in NSO?"
- Ask for examples: "Show me the L3VPN validation code"
- Request comparisons: "What's the difference between NSO and Crosswork wizards?"

### Modifying Wizards
- Keep expert consultant tone
- Break into phases
- Ask questions one at a time
- Include best practices in output

## 🔧 Troubleshooting

**Q: Claude doesn't seem to know about the project**
A: Make sure `project-instructions.md` exists in `.claude/` directory

**Q: Slash command doesn't work**
A: Check that `commands/[name]-wizard.md` file exists

**Q: Claude gives generic answers**
A: Ask more specific questions and reference documentation files

**Q: Need to update wizard behavior**
A: Edit the relevant `.md` file in `commands/` directory

## 📊 Statistics

- **Project Instructions**: 400+ lines of context
- **Slash Commands**: 4 wizards, 1,500+ lines total
- **Referenced Docs**: 2,800+ lines
- **Example Code**: L3VPN package with all files

---

**This configuration makes Claude Code your expert consultant for the Any1Can Code Platform!**
