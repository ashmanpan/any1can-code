# Production Examples for Any1Can Code Platform

## 🎯 Purpose

This directory contains **authenticated, production-ready examples** that Claude Code must reference **FIRST** before generating any code.

These examples represent best practices, correct patterns, and proven implementations that have been validated in real-world scenarios.

---

## 📁 Directory Structure

```
examples/
├── nso-packages/          # NSO service package examples
├── crosswork-workflows/   # Crosswork workflow examples
└── python-scripts/        # Python automation script examples
```

---

## 🔍 How Claude Code Uses These Examples

When generating code, Claude Code **MUST**:

1. ✅ **Read examples in this directory FIRST** before generating new code
2. ✅ **Follow the exact patterns** demonstrated in these examples
3. ✅ **Use these as templates** for structure, validation, error handling
4. ✅ **Reference specific files** when explaining patterns to users

### Priority Order:
1. **Examples in this directory** (authenticated, production-ready)
2. Cisco official documentation (developer.cisco.com)
3. YANG RFCs (for YANG modeling)

---

## 📦 NSO Packages (`nso-packages/`)

### What to Put Here:
- Complete NSO service packages with all files
- Different service types (L3VPN, L2VPN, QoS, ACL, Interface, etc.)
- Different complexity levels (simple, medium, complex)
- Different device platforms (IOS-XR, IOS-XE, NX-OS, etc.)

### Expected Structure for Each Package:
```
package-name/
├── package-meta-data.xml       # NSO metadata, NED dependencies
├── src/
│   ├── yang/
│   │   └── package-name.yang   # YANG model
│   └── Makefile                # YANG compilation
├── templates/
│   └── package-name-template.xml  # Device configuration template
├── python/package-name/
│   ├── __init__.py
│   └── main.py                 # Service callbacks with validation
├── test/
│   └── test-data.xml           # Test payloads
├── Makefile                    # Build configuration
└── README.md                   # Package documentation
```

### Key Patterns to Demonstrate:
- ✅ Proper YANG types (`inet:ipv4-address`, not `string`)
- ✅ Leafref for device references
- ✅ Comprehensive validation in Python
- ✅ Custom exception classes
- ✅ XML conditionals and loops
- ✅ Error handling and logging
- ✅ Transaction safety

---

## ⚙️ Crosswork Workflows (`crosswork-workflows/`)

### What to Put Here:
- Complete workflow definitions (JSON/YAML)
- Different workflow types (provisioning, monitoring, remediation, compliance)
- Different trigger types (scheduled, event-based, API)
- Different complexity levels

### Expected Structure for Each Workflow:
```
workflow-name/
├── workflow-definition.json    # Complete workflow JSON
├── workflow-config.yaml        # Configuration parameters
├── actions/
│   ├── step1-action.py         # Custom Python actions
│   └── step2-action.py
├── templates/
│   ├── config-template.j2      # Jinja2 templates
│   └── notification-template.j2
├── tests/
│   ├── test-happy-path.json    # Test scenarios
│   └── test-failure.json
└── README.md                   # Workflow documentation
```

### Key Patterns to Demonstrate:
- ✅ Comprehensive error handling for each step
- ✅ Rollback procedures
- ✅ Input/output parameter mapping
- ✅ Timeout configuration
- ✅ Secure credential handling
- ✅ Logging and audit trail
- ✅ Idempotent operations

---

## 🐍 Python Scripts (`python-scripts/`)

### What to Put Here:
- Network automation scripts
- Device interaction scripts (SSH, NETCONF, REST API)
- Data processing scripts
- Integration scripts (IPAM, CMDB, ServiceNow)

### Expected Structure for Each Script:
```
script-name/
├── script.py                   # Main script
├── requirements.txt            # Dependencies
├── config-example.yaml         # Configuration template
├── tests/
│   └── test_script.py          # Unit tests
└── README.md                   # Script documentation
```

### Key Patterns to Demonstrate:
- ✅ Type hints (Python 3.7+)
- ✅ Error handling with try-except
- ✅ Logging with proper levels
- ✅ Configuration via files or env vars
- ✅ CLI argument parsing
- ✅ Connection handling (retry, timeout)
- ✅ Documentation and docstrings

---

## 📝 Adding New Examples

When adding new examples to this directory:

1. **Create a subdirectory** under the appropriate category
2. **Include ALL files** needed for a complete, working example
3. **Add a README.md** explaining:
   - What the example does
   - Key features demonstrated
   - How to test/deploy it
   - Any prerequisites or dependencies
4. **Follow best practices**:
   - Complete validation
   - Proper error handling
   - Comprehensive logging
   - Clear comments
   - Test data included

---

## ✅ Example Checklist

Before adding an example, ensure it has:

### For NSO Packages:
- [ ] Complete package structure (all directories)
- [ ] YANG model with proper types
- [ ] XML template with conditionals/loops
- [ ] Python service with validation
- [ ] Custom exception class
- [ ] Logging (info, error levels)
- [ ] package-meta-data.xml with NED dependencies
- [ ] Makefile for building
- [ ] Test data
- [ ] README.md with usage examples

### For Crosswork Workflows:
- [ ] Complete workflow definition (JSON/YAML)
- [ ] Error handling for all steps
- [ ] Rollback procedures
- [ ] Timeout configuration
- [ ] Custom Python actions (if needed)
- [ ] Jinja2 templates (if needed)
- [ ] Test scenarios
- [ ] README.md with usage examples

### For Python Scripts:
- [ ] Complete, runnable script
- [ ] Type hints
- [ ] Error handling
- [ ] Logging
- [ ] CLI argument parsing
- [ ] Configuration handling
- [ ] requirements.txt
- [ ] Test cases
- [ ] README.md with usage examples

---

## 🔗 Integration with Claude Code

These examples are automatically referenced by Claude Code through:

1. **CLAUDE.md** - Main instruction file that tells Claude to check examples FIRST
2. **.claude/project-instructions.md** - References examples directory
3. **Wizard prompts** - Instruct Claude to follow example patterns

### How It Works:
```
User asks for NSO package
    ↓
Claude reads CLAUDE.md (knows to check examples first)
    ↓
Claude reads examples/nso-packages/ directory
    ↓
Claude identifies similar example
    ↓
Claude uses example as template/pattern
    ↓
Claude generates new code following example patterns
```

---

## 📚 Documentation Standards

Each example MUST have a README.md with:

### 1. Overview
- Brief description (1-2 sentences)
- Use case / problem solved

### 2. Features
- Key capabilities
- What makes this example valuable

### 3. Structure
- File/directory tree
- Purpose of each file

### 4. Prerequisites
- NSO version (for NSO packages)
- Required NEDs (for NSO packages)
- Python version (for Python scripts)
- Required libraries

### 5. Installation/Deployment
- Step-by-step instructions
- Build commands
- Testing commands

### 6. Usage Examples
- Sample commands
- Expected outputs
- Test scenarios

### 7. Key Patterns
- What best practices are demonstrated
- What to learn from this example

---

## 🎓 Learning from Examples

Users and Claude can learn from these examples by:

1. **Studying file structure** - How to organize code
2. **Reading validation code** - How to validate properly
3. **Examining error handling** - How to handle failures
4. **Reviewing templates** - How to use conditionals/loops
5. **Understanding workflows** - How to orchestrate automation

---

## 🚀 Current Examples

### NSO Packages:
*(Add list of examples here as you add them)*
- Example 1: [Name] - [Brief description]
- Example 2: [Name] - [Brief description]

### Crosswork Workflows:
*(Add list of examples here as you add them)*
- Example 1: [Name] - [Brief description]
- Example 2: [Name] - [Brief description]

### Python Scripts:
*(Add list of examples here as you add them)*
- Example 1: [Name] - [Brief description]
- Example 2: [Name] - [Brief description]

---

## 🔄 Updating Examples

Examples should be kept up-to-date with:
- Latest NSO versions
- Latest Crosswork versions
- Python best practices
- Security updates
- Performance improvements

When updating:
1. Update the code files
2. Update README.md with changes
3. Update test cases
4. Verify examples still work
5. Document breaking changes (if any)

---

**These examples are the foundation of code quality in the Any1Can Code Platform. Keep them accurate, complete, and well-documented!**

---

**Created:** 2025-11-06
**Purpose:** Store authenticated, production-ready examples for Claude Code to reference
