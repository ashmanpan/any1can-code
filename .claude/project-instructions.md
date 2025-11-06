# Any1Can Code Platform - Project Instructions for Claude Code

## 🎯 Project Overview

This is the **Any1Can Code Platform** - an AI-powered code generation system that helps users create production-ready code through conversational wizards, with special focus on **Cisco Network Automation** (NSO and Crosswork).

## ⚠️ IMPORTANT: Read CLAUDE.md First

**Before working on this repository, you MUST read:**
- **`/home/kpanse/wsl-myprojects/any1can-code/CLAUDE.md`**

This file contains:
- Mandatory Cisco documentation references (ONLY official Cisco docs)
- Complete wizard system prompts for NSO and Crosswork
- Code generation rules and patterns
- Quality checklist
- Examples and best practices

**Key Rules:**
1. ✅ ONLY use Cisco official documentation (developer.cisco.com)
2. ✅ Follow wizard system prompts exactly
3. ✅ Use L3VPN example as pattern
4. ✅ Generate complete, production-ready code
5. ❌ NO third-party blogs or unofficial sources

## 📁 Important Files & Resources

### 📚 Documentation to Reference

When users ask for help, always reference these files:

1. **README.md** - Quick start guide, feature overview, installation
   - Location: `/home/kpanse/wsl-myprojects/any1can-code-platfrom/README.md`
   - Use for: Getting started questions, feature explanations

2. **NSO-CROSSWORK-WIZARD-GUIDE.md** - Comprehensive guide for network automation wizards
   - Location: `/home/kpanse/wsl-myprojects/any1can-code-platfrom/NSO-CROSSWORK-WIZARD-GUIDE.md`
   - Use for: NSO package questions, Crosswork workflow questions, best practices

3. **AI-WIZARD-IMPLEMENTATION.md** - Wizard architecture and implementation details
   - Location: `/home/kpanse/wsl-myprojects/any1can-code-platfrom/AI-WIZARD-IMPLEMENTATION.md`
   - Use for: How wizards work, UI/UX details, technical architecture

4. **PROJECT-SUMMARY.md** - Complete project overview
   - Location: `/home/kpanse/wsl-myprojects/any1can-code-platfrom/PROJECT-SUMMARY.md`
   - Use for: Project statistics, technology stack, architecture decisions

### 🎓 Example Code to Reference

When generating code, use these examples as patterns:

1. **L3VPN NSO Package** (Complete Production Example)
   - Location: `/home/kpanse/wsl-myprojects/any1can-code-platfrom/L3VPN/`
   - Files:
     * `package-meta-data.xml` - NSO package metadata
     * `src/yang/L3VPN.yang` - YANG model example
     * `templates/L3VPN-template.xml` - XML device template
     * `python/L3VPN/main.py` - Python service callbacks with validation
   - Use for: NSO package structure, validation patterns, error handling

### 🤖 Wizard Prompts (Slash Commands)

Located in: `claude-code-webui/.claude/commands/`

1. **nso-wizard.md** (374 lines)
   - Comprehensive NSO package generation
   - 6 phases, 32 questions
   - Use when: User wants to create NSO packages

2. **crosswork-wizard.md** (620 lines)
   - Comprehensive Crosswork workflow generation
   - 8 phases, 44 questions
   - Use when: User wants to create automation workflows

3. **html-wizard.md**
   - HTML website generation
   - Use when: User wants to create websites

4. **python-wizard.md**
   - Python automation scripts
   - Use when: User wants Python scripts

## 🎯 When User Asks...

### "How do I create an NSO package?"
1. Reference: `NSO-CROSSWORK-WIZARD-GUIDE.md` (NSO section)
2. Show: L3VPN example structure
3. Suggest: Using `/nso-wizard` command
4. Explain: The wizard will ask 32 questions across 6 phases

### "How do I create a Crosswork workflow?"
1. Reference: `NSO-CROSSWORK-WIZARD-GUIDE.md` (Crosswork section)
2. Suggest: Using `/crosswork-wizard` command
3. Explain: The wizard will ask 44 questions across 8 phases

### "What does this project do?"
1. Reference: `README.md` for overview
2. Reference: `PROJECT-SUMMARY.md` for details
3. Highlight: 4 AI-powered wizards, conversational interface

### "How do the wizards work?"
1. Reference: `AI-WIZARD-IMPLEMENTATION.md`
2. Explain: Conversational flow, no forms
3. Show: Example conversation from docs

### "Can you show me an NSO package example?"
1. Read and show: `L3VPN/` directory structure
2. Highlight:
   - YANG model patterns
   - XML template structure
   - Python validation code
3. Explain: This is production-ready code

### "How do I validate in NSO?"
1. Reference: `L3VPN/python/L3VPN/main.py`
2. Show: Validation patterns like:
   - `_is_valid_route_target()`
   - `_is_valid_route_distinguisher()`
   - `_validate_site()`
3. Explain: Best practices used

## 🔧 Development Instructions

### When User Wants to Modify Wizards

1. **To modify NSO wizard:**
   - Edit: `claude-code-webui/.claude/commands/nso-wizard.md`
   - Test: Use `/nso-wizard` command
   - Validate: Generate a package and verify completeness

2. **To modify Crosswork wizard:**
   - Edit: `claude-code-webui/.claude/commands/crosswork-wizard.md`
   - Test: Use `/crosswork-wizard` command
   - Validate: Generate a workflow and verify structure

3. **To modify UI:**
   - Edit: `claude-code-webui/frontend/src/components/ConversationalWizard.tsx`
   - Check: Cisco branding, gradients, glassmorphism maintained

### When User Wants to Add New Wizard

1. Create new slash command: `claude-code-webui/.claude/commands/[name]-wizard.md`
2. Add to ConversationalWizard.tsx in `conversationalWizardPrompts`
3. Update documentation
4. Test thoroughly

## 📖 Code Generation Guidelines

### For NSO Packages

Always include:
- ✅ Proper YANG types (ipv4-address, not string)
- ✅ Leafref for device references
- ✅ Comprehensive validation in Python
- ✅ Error handling with custom exceptions
- ✅ Logging at appropriate levels
- ✅ XML templates with conditionals/loops
- ✅ Complete documentation

**Pattern to follow:** See `L3VPN/` directory

### For Crosswork Workflows

Always include:
- ✅ Workflow definition (JSON/YAML)
- ✅ Trigger configuration
- ✅ Step-by-step actions
- ✅ Error handling and rollback
- ✅ Input/output mapping
- ✅ Custom Python scripts if needed
- ✅ Complete documentation

**Pattern to follow:** See examples in `crosswork-wizard.md`

## 🎓 Best Practices to Follow

### From L3VPN Example

1. **Validation Pattern:**
   ```python
   def _validate_service_data(self, service):
       """Validate before applying config"""
       # Check format
       if not self._is_valid_route_target(service.route_target):
           raise ValidationError(...)
       # Check existence
       if not self._device_exists(site.device):
           raise ValidationError(...)
       # Check ranges
       if site.vlan_id and (site.vlan_id < 1 or site.vlan_id > 4094):
           raise ValidationError(...)
   ```

2. **Error Handling Pattern:**
   ```python
   try:
       self._validate_service_data(service)
       # Apply config
   except ValidationError as e:
       self.log.error(f'Validation error: {str(e)}')
       raise
   except Exception as e:
       self.log.error(f'Error: {str(e)}')
       self.log.error(f'Traceback: {traceback.format_exc()}')
       raise
   ```

3. **Logging Pattern:**
   ```python
   self.log.info(f'Service create(service={service._path})')
   self.log.info(f'Service {service.name} created successfully')
   self.log.error(f'Error for service {service.name}: {str(e)}')
   ```

## 🚀 Common Commands

```bash
# Start application
cd claude-code-webui/backend && npm run dev
cd claude-code-webui/frontend && npm run dev

# Test wizards
/nso-wizard
/crosswork-wizard
/html-wizard
/python-wizard

# Check documentation
cat README.md
cat NSO-CROSSWORK-WIZARD-GUIDE.md
```

## 📊 Quick Stats

- **4 AI Wizards**: NSO, Crosswork, HTML, Python
- **100+ Questions**: Across all wizards
- **2,800+ Lines**: Of documentation
- **25,000+ Lines**: Of code
- **1 Production Example**: L3VPN NSO package

## 🎯 User Goals

Help users achieve:
1. **Generate NSO packages** without deep NSO knowledge
2. **Create Crosswork workflows** through conversation
3. **Build websites** quickly
4. **Automate with Python** easily
5. **Learn best practices** from generated code

## 💡 Tips for Helping Users

1. **Always start with documentation** - Don't guess, read the docs
2. **Reference L3VPN example** - It's production-ready code
3. **Use wizard prompts** - They contain expert knowledge
4. **Be specific with file paths** - Help users find files easily
5. **Show code patterns** - Use L3VPN as template
6. **Explain best practices** - Teach while helping

## 🔍 When in Doubt

1. Read `NSO-CROSSWORK-WIZARD-GUIDE.md` first
2. Check `L3VPN/` example code
3. Review wizard prompt in `.claude/commands/`
4. Reference `PROJECT-SUMMARY.md` for architecture

---

**Remember: This project's strength is in its comprehensive documentation and production-ready examples. Always reference them!**
