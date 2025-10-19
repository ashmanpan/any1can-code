# Comprehensive NSO & Crosswork Wizard Guide

## 🎯 Overview

This guide explains how to use the **enhanced AI-driven wizards** specifically designed for **Cisco NSO Package** development and **Cisco Crosswork Workflow Manager** automation.

These are **production-grade wizards** that act as expert consultants, asking detailed questions to generate complete, enterprise-ready code.

---

## 🚀 Quick Start

### **Access the Wizards**

**Method 1: Floating Button (UI)**
1. Start claude-code-webui
2. Click the glowing cyan floating button (bottom-right)
3. Select **"Cisco NSO Package Generator"** or **"Crosswork Workflow Generator"**

**Method 2: Slash Commands (Chat)**
- Type `/nso-wizard` for NSO packages
- Type `/crosswork-wizard` for Crosswork workflows

---

## 📦 **Cisco NSO Package Wizard**

### **What It Does**
Creates complete, production-ready NSO service packages with:
- ✅ YANG models with proper types and namespacing
- ✅ XML device templates with conditional logic
- ✅ Python service callbacks with validation
- ✅ Error handling and logging
- ✅ Makefile and documentation
- ✅ Test data and examples

### **Interview Phases**

#### **Phase 1: Understanding the Service** (5 questions)
- Service name, purpose, and description
- Target device platforms and NEDs
- Service category (L3VPN, L2VPN, QoS, ACL, etc.)
- Complexity level and dependencies
- Existing examples or templates

#### **Phase 2: YANG Model Design** (8-10 questions)
- Basic parameters (name, type, mandatory/optional)
- Lists and complex types (customer sites, interfaces)
- Device selection mechanism
- Advanced optional parameters
- YANG groupings for reusability
- Service relationships and dependencies
- Namespace and prefix configuration

#### **Phase 3: CLI Configuration Templates** (5-7 questions)
- Device CLI commands for each platform
- Configuration hierarchy and order
- Dynamic logic (conditionals, loops)
- Rollback and cleanup procedures
- Device-specific variations

#### **Phase 4: Python Service Logic** (6-8 questions)
- Validation requirements (format, range, existence)
- Pre/post checks
- Custom actions (health check, dry-run, rollback)
- State management (operational data)
- Error handling strategy
- External system integrations (IPAM, CMDB, ServiceNow)
- Logging and notifications

#### **Phase 5: Advanced Features** (Optional, 3-5 questions)
- Template-based vs. resource-facing service
- Nano services for FASTMAP
- Multi-tenancy and tenant isolation
- Versioning and migration
- Performance and scale requirements

#### **Phase 6: Testing & Documentation** (2-3 questions)
- Test data and scenarios
- Documentation requirements
- NSO version and deployment constraints

### **Generated Package Structure**
```
[service-name]/
├── package-meta-data.xml       # NSO metadata, NED dependencies
├── src/yang/
│   └── [service-name].yang     # Complete YANG model
├── templates/
│   └── [service-name]-template.xml  # Device configuration template
├── python/[service-name]/
│   ├── __init__.py
│   └── main.py                 # Service callbacks, validation
├── test/
│   └── test-service.xml        # Test payloads
├── Makefile                    # Build configuration
└── README.md                   # Complete documentation
```

### **Example Use Cases**
1. **L3VPN Service** - Multi-site VPN with BGP
2. **QoS Policy Service** - Traffic shaping and policing
3. **Firewall Rule Service** - ACL and zone-based firewall
4. **Interface Configuration** - Standardized interface setup
5. **VLAN Service** - Automated VLAN provisioning
6. **Routing Service** - BGP, OSPF, static routes

### **Best Practices Included**
- ✅ Proper YANG types (ipv4-address, not string)
- ✅ Leafref for device references
- ✅ Comprehensive validation before commit
- ✅ Transaction safety and idempotency
- ✅ Custom exceptions with clear messages
- ✅ Logging at appropriate levels
- ✅ Documentation inline and external

---

## ⚙️ **Cisco Crosswork Workflow Manager Wizard**

### **What It Does**
Creates complete, production-ready Crosswork workflows with:
- ✅ Workflow definition (JSON/YAML)
- ✅ Trigger configuration (scheduled, event, API)
- ✅ Step-by-step action definitions
- ✅ Input/output parameter mapping
- ✅ Error handling and rollback procedures
- ✅ Notifications and integrations
- ✅ Custom Python action scripts
- ✅ Jinja2 templates
- ✅ Test scenarios and documentation

### **Interview Phases**

#### **Phase 1: Workflow Purpose & Scope** (5 questions)
- Workflow name and description
- Category (Provisioning, Monitoring, Remediation, Compliance, etc.)
- Network scope (Data center, WAN, SD-WAN, Multi-cloud)
- Complexity and dependencies
- Target devices and platforms

#### **Phase 2: Trigger Configuration** (5-7 questions)
- Trigger type (Scheduled, Event-based, Manual, API/Webhook)
- Trigger details:
  * **Scheduled**: Cron expression, immediate vs. wait, concurrent handling
  * **Event-based**: Event types, sustained condition, deduplication
  * **API/Webhook**: Authentication, sync/async modes
- Trigger filters and conditions
- Input parameters from trigger

#### **Phase 3: Input Parameters & Validation** (4-6 questions)
- Required input parameters (name, type, description, validation)
- Optional parameters with defaults
- Parameter validation rules
- Dynamic parameters (from CMDB, IPAM)
- Parameter groups and dependencies

#### **Phase 4: Workflow Steps & Actions** (10-15 questions)
- Main workflow steps sequence
- Action types for each step:
  * CLI Command, API Call, NSO Service
  * Python Script, Shell Script
  * HTTP Request, Database Query
  * File Operation, Data Transformation
  * Wait/Delay, Approval Gate
  * Notification, Conditional Branch
  * Loop/Iteration, Parallel Execution
  * Sub-workflow
- Step input/output mapping
- Conditional logic and branching
- Loops and iterations
- Parallel execution configuration
- Wait conditions and delays
- Sub-workflows and modularity

#### **Phase 5: Error Handling & Rollback** (5-7 questions)
- Error handling strategy per step (Abort, Continue, Retry, Rollback, Fallback)
- Retry logic (attempts, delay strategy)
- Rollback procedures (restore config, release resources)
- Partial success handling
- Timeout configuration (workflow, steps)
- Error notifications (channels, recipients, detail level)

#### **Phase 6: Output & Notifications** (4-5 questions)
- Workflow outputs (status, logs, reports, metrics)
- Success notifications
- Logging level and audit trail
- Dashboard and reporting integrations
- Ticketing system integration (ServiceNow, Jira)

#### **Phase 7: Advanced Features** (Optional, 4-6 questions)
- Approval gates (manual intervention)
- Dry-run / simulation mode
- Maintenance window enforcement
- Rate limiting and throttling
- State persistence and resumability
- Multi-tenancy and RBAC

#### **Phase 8: Testing & Documentation** (3 questions)
- Test scenarios (happy path, failures, edge cases)
- Sample input data
- Documentation and runbook requirements

### **Generated Workflow Structure**
```
workflow-[name]/
├── workflow-definition.json    # Complete workflow JSON
├── workflow-config.yaml        # Configuration parameters
├── actions/
│   ├── step1-action.py         # Custom Python actions
│   ├── step2-action.py
│   └── ...
├── templates/
│   ├── config-template.j2      # Jinja2 configuration templates
│   └── notification-template.j2
├── tests/
│   ├── test-happy-path.json    # Test payloads
│   └── test-failure.json
├── docs/
│   ├── README.md               # Usage documentation
│   └── RUNBOOK.md              # Troubleshooting guide
└── Dockerfile (optional)       # Containerization
```

### **Example Use Cases**
1. **Zero-Touch Provisioning** - Automated device onboarding
2. **Golden Config Compliance** - Configuration audit and remediation
3. **Self-Healing Network** - Automated incident response
4. **Service Lifecycle Management** - Provision → Monitor → Scale → Decommission
5. **Multi-Cloud Connectivity** - Hybrid cloud automation
6. **Change Automation** - Pre-check → Change → Verify → Rollback
7. **Backup & Restore** - Scheduled configuration backups

### **Workflow Patterns Included**
- ✅ **Idempotent operations** - Safe to re-run
- ✅ **Comprehensive error handling** - Every step has fallback
- ✅ **Rollback procedures** - Undo on failure
- ✅ **Logging and audit trail** - Who, what, when, where
- ✅ **Timeout protection** - No infinite loops
- ✅ **Secure credentials** - No hardcoded secrets
- ✅ **Modular design** - Reusable sub-workflows
- ✅ **Testable** - Unit and integration tests

---

## 🎨 **Comparison: NSO vs. Crosswork**

| Feature | NSO Package Wizard | Crosswork Workflow Wizard |
|---------|-------------------|--------------------------|
| **Purpose** | Network service models & templates | Automation workflows & orchestration |
| **Output** | YANG models, XML templates, Python callbacks | JSON/YAML workflow definitions, action scripts |
| **Use Case** | Service provisioning (L3VPN, QoS, etc.) | Operational automation (health checks, remediation) |
| **Complexity** | Service-level abstraction | Workflow-level orchestration |
| **Questions** | ~30 questions across 6 phases | ~44 questions across 8 phases |
| **Time to Complete** | 15-30 minutes | 20-40 minutes |
| **Generated Files** | 6-8 files | 10-15 files |

---

## 📋 **Tips for Best Results**

### **Be Specific**
❌ "I need a VPN service"
✅ "I need an L3VPN service for Cisco IOS-XR routers that creates VRFs with BGP route targets and provisions customer sites with VLAN sub-interfaces"

### **Provide Examples**
When asked for CLI commands, provide actual device output:
```
vrf customer-a
  address-family ipv4 unicast
    import route-target 65000:100
    export route-target 65000:100
  !
!
```

### **Think End-to-End**
- Consider validation (what can go wrong?)
- Think about rollback (how to undo?)
- Plan for monitoring (how to verify success?)
- Consider integrations (IPAM, CMDB, ticketing)

### **Iterate**
- Start with basic requirements
- Generate initial code
- Review and refine
- Ask Claude to enhance specific parts

---

## 🧪 **Testing Your Generated Code**

### **For NSO Packages**
```bash
# Load package into NSO
cd [service-name]
make clean all
ncs-setup --package $PWD --dest ~/ncs-run

# Test with NSO CLI
ncs_cli -C -u admin
show packages package [service-name]
config
[service-name] test-service
  # ... configure parameters ...
commit dry-run
commit
exit
```

### **For Crosswork Workflows**
```bash
# Validate workflow definition
python -m json.tool workflow-definition.json

# Test with sample data
crosswork-cli workflow create -f workflow-definition.json
crosswork-cli workflow execute --id [workflow-id] --input tests/test-happy-path.json
crosswork-cli workflow logs --execution-id [exec-id]
```

---

## 🆘 **Troubleshooting**

### **Wizard Not Starting**
- Ensure claude-code-webui is running
- Check browser console for errors
- Verify floating button is visible
- Try slash command as alternative: `/nso-wizard` or `/crosswork-wizard`

### **Claude Asks Too Many Questions**
- You can interrupt and say: "Let's skip the advanced features"
- Or: "Use default settings for remaining questions"
- Or: "Generate with what we have so far"

### **Generated Code Has Issues**
- Ask Claude: "The YANG model has a syntax error on line X, can you fix it?"
- Or: "Can you add more validation for VLAN IDs?"
- Claude can iterate and refine the generated code

### **Need to Modify Generated Code**
- Ask Claude to make specific changes
- Or manually edit and ask Claude to review
- Claude understands the full context of what was generated

---

## 📚 **Learning Resources**

### **Cisco NSO**
- [NSO Developer Hub](https://developer.cisco.com/site/nso/)
- [NSO Documentation](https://developer.cisco.com/docs/nso/)
- Your local L3VPN example: `/home/kpanse/wsl-myprojects/any1can-code-platfrom/L3VPN/`

### **Cisco Crosswork**
- [Crosswork Developer Hub](https://developer.cisco.com/site/crosswork/)
- [Crosswork Workflow Manager Docs](https://developer.cisco.com/site/crosswork-workflow-manager/)
- [Cisco CodeExchange](https://developer.cisco.com/codeexchange/)

---

## 🎯 **Real-World Examples**

### **NSO: L3VPN Service**
```
Wizard: "What would you like to name this service?"
You: "l3vpn-service"

Wizard: "What does this service do?"
You: "Automates L3VPN provisioning on Cisco IOS-XR PE routers with VRF configuration,
      BGP route targets, and customer site interface provisioning"

Wizard: "Which device platforms?"
You: "Cisco IOS-XR"

Wizard: "What basic parameters are needed?"
You: "vrf-name (string, mandatory), route-distinguisher (string, mandatory),
      route-target (string, mandatory)"

Wizard: "Do you need lists?"
You: "Yes, customer-sites list with: site-id (key), device (leafref),
      interface (string), ip-address, subnet-mask, vlan-id (optional)"

... (continues through all phases)

Result: Complete L3VPN package like the one in your project!
```

### **Crosswork: Golden Config Compliance**
```
Wizard: "What would you like to name this workflow?"
You: "golden-config-compliance-check"

Wizard: "What problem does this solve?"
You: "Automated compliance checking of network device configurations against
      approved golden templates, with automated remediation or alerting"

Wizard: "Which category?"
You: "Compliance"

Wizard: "How should it be triggered?"
You: "Scheduled - daily at 2 AM"

Wizard: "What are the workflow steps?"
You: "1. Fetch device configs via NETCONF
      2. Compare to golden templates
      3. Identify configuration drift
      4. Generate compliance report
      5. If drift found, create ServiceNow ticket
      6. If critical drift, send Webex alert
      7. Optionally auto-remediate"

... (continues with detailed step configuration)

Result: Complete workflow with JSON definition, Python scripts,
        templates, tests, and documentation!
```

---

## 🚀 **Next Steps**

1. **Try the wizards** with simple use cases first
2. **Review generated code** to understand patterns
3. **Customize** for your specific environment
4. **Deploy** to test/dev NSO or Crosswork instance
5. **Iterate** and refine with Claude's help
6. **Share** reusable packages/workflows with your team

---

## 💡 **Pro Tips**

- **Save the conversation**: Keep the chat history as documentation
- **Version control**: Put generated code in Git immediately
- **Test in stages**: Validate YANG → Test template → Test Python
- **Build a library**: Create reusable sub-workflows and YANG groupings
- **Document customizations**: If you modify generated code, document why

---

**The wizards are designed to be your expert consultants - treat them like senior Cisco architects who will guide you step-by-step to production-ready code!** 🎉

---

**Created:** October 19, 2025
**Version:** 2.0.0 (Enhanced with comprehensive NSO & Crosswork expertise)
