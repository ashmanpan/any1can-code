# Crosswork Workflow Examples - Index

## 📋 Available Examples

This directory contains **authenticated, production-ready** Crosswork workflow examples.

### Additional Cloned Repositories

We have cloned additional GitHub repositories with more examples:

#### 1. CWM Workflows (General Purpose)
**Location:** `cwm-workflows/`
**Source:** https://github.com/annately/cwm-workflows
**Contains:**
- Curated collection of Crosswork Workflow Manager examples
- Community-contributed workflows
- Various use cases and patterns
- Organized by workflow type

#### 2. IOS-XR Upgrade Workflows
**Location:** `xr-upgrade-workflows/`
**Source:** https://github.com/waitai/xr-upgrade-workflows
**Contains:**
- Cisco IOS-XR upgrade automation workflows
- Pre-upgrade checks
- Upgrade execution workflows
- Post-upgrade validation
- Rollback procedures

**Usage:** Browse these directories for additional patterns and examples when generating workflows.

---

## 1. Direct NSO Workflows (`1.Direct-NSO-Workflows/`)

Workflows that interact directly with Cisco NSO for network automation.

### 1.1 L3VPN Service Provisioning
**Location:** `1.Direct-NSO-Workflows/L3VPN-Service-Provisioning/`
**Files:**
- `configure_vpn_service.json` - Workflow definition
- `payloads.json` - Sample payloads
- `Readme.txt` - Description

**Use Case:** Automate L3VPN service provisioning through NSO
**Key Features:**
- Direct NSO REST API integration
- Service creation and configuration
- Error handling

---

### 1.2 Get NSO Devices
**Location:** `1.Direct-NSO-Workflows/Get-NSO-Devices/`
**Files:**
- `test-nso-live-status.json` - Workflow definition
- `payload.json` - Sample payload
- `Readme.txt` - Description

**Use Case:** Retrieve device list from NSO
**Key Features:**
- NSO device inventory query
- REST API calls
- Data retrieval

---

### 1.3 Run NSO Live-Status Commands
**Location:** `1.Direct-NSO-Workflows/Run-NSO-Live-Status-Commands/`
**Files:**
- `nso-live-status-wf.json` - Workflow definition
- `payloads.json` - Sample payloads
- `Readme.txt` - Description

**Use Case:** Execute live-status commands on devices via NSO
**Key Features:**
- Live-status command execution
- Real-time device querying
- Command output capture

---

## 2. CNC Workflows (`2.CNC-Workflows/`)

Workflows for Cisco Network Controller (CNC) integration.

### 2.1 Monitor Link
**Location:** `2.CNC-Workflows/Monitor-Link.json`
**Files:**
- `Monitor-Link.json` - Workflow definition
- `Readme.txt` - Description

**Use Case:** Monitor network link status
**Key Features:**
- Link monitoring
- Threshold detection
- Alert generation

---

### 2.2 CNC Authorization
**Location:** `2.CNC-Workflows/CNC-Authorization.json`
**Files:**
- `CNC-Authorization.json` - Workflow definition
- `Readme.txt` - Description

**Use Case:** Handle CNC authentication
**Key Features:**
- OAuth authentication
- Token management
- Secure API access

---

## 3. Webex Integration (`3.Webex_Integration_With_Proxy/`)

Workflows for Webex notifications and integration.

### 3.1 Generic Webex Notification
**Location:** `3.Webex_Integration_With_Proxy/genericWebexNotification.json`

**Use Case:** Send notifications to Webex Teams
**Key Features:**
- Webex API integration
- Message formatting
- Room/user targeting

---

### 3.2 Webex with Proxy
**Location:** `3.Webex_Integration_With_Proxy/Webex_with_Proxy.json`

**Use Case:** Webex integration through corporate proxy
**Key Features:**
- Proxy configuration
- Secure communication
- Corporate network compatibility

---

## 4. Golden Config (`4.Golden_Config/`)

Workflows for configuration compliance and golden config management.

### 4.1 Create GC Application
**Location:** `4.Golden_Config/create_gc_application.json`

**Use Case:** Create Golden Config application in Crosswork
**Key Features:**
- Application creation
- Template registration
- Configuration baseline setup

---

### 4.2 Delete GC Application
**Location:** `4.Golden_Config/delete_gc_application.json`

**Use Case:** Delete Golden Config application
**Key Features:**
- Application cleanup
- Resource deallocation
- Safe deletion

---

### 4.3 FlexAlgo Templates
**Files:**
- `flex_algo_app.xml` - FlexAlgo application config
- `flex_algo_template.xml` - FlexAlgo template
- `Job_Payloads_for_GC_applications.json` - Sample payloads

**Use Case:** Flex Algorithm configuration compliance
**Key Features:**
- SR-FlexAlgo configuration
- Template-based management
- Compliance checking

---

## 5. Database Workflows (`5.Database_Workflows/`)

Workflows for database operations.

### 5.1 PostgreSQL Query
**Location:** `5.Database_Workflows/postgres-query.json`

**Use Case:** Query PostgreSQL database
**Key Features:**
- SQL query execution
- Result parsing
- Data retrieval

---

### 5.2 PostgreSQL Insert/Update
**Location:** `5.Database_Workflows/postgres-insert-update.json`

**Use Case:** Insert or update database records
**Key Features:**
- Data manipulation
- Transaction management
- Error handling

---

## 🎯 How to Use These Examples

### For Learning:
1. Read the workflow JSON files to understand structure
2. Check README files for use case explanations
3. Study error handling patterns
4. Review input/output mappings

### For Code Generation:
When Claude generates new workflows, it will:
1. Check this directory first
2. Find similar workflow type
3. Use it as template
4. Follow same patterns for:
   - Error handling
   - Input validation
   - Output formatting
   - Logging
   - Notifications

### For Testing:
1. Use payload files as test input
2. Verify workflow structure matches examples
3. Ensure same quality standards

---

## 📊 Example Statistics

- **Total Categories:** 5
- **Total Workflows:** 14+
- **Workflow Types:**
  - NSO Integration: 3
  - CNC Integration: 2
  - Webex Integration: 2
  - Golden Config: 3+
  - Database Operations: 2

---

## 🔑 Key Patterns to Learn

### 1. NSO Integration Pattern
```json
{
  "action": "http_request",
  "url": "https://nso-server:port/restconf/data/...",
  "method": "POST|GET|PATCH",
  "auth": {
    "type": "basic",
    "username": "{{ nso_username }}",
    "password": "{{ nso_password }}"
  },
  "error_handling": {
    "on_error": "retry",
    "max_retries": 3
  }
}
```

### 2. Error Handling Pattern
All workflows include comprehensive error handling:
- Retry logic with backoff
- Fallback actions
- Error notifications
- Timeout configuration

### 3. Input Validation Pattern
Workflows validate inputs before execution:
- Required parameter checks
- Format validation
- Range validation

### 4. Logging Pattern
Consistent logging throughout:
- Step start/end logging
- Input/output logging
- Error logging with context

---

## 📝 Adding New Examples

When adding new workflow examples:

1. **Create subdirectory** if new category
2. **Include:**
   - Workflow JSON definition
   - Sample payload files
   - README.txt with description
3. **Update this INDEX.md** with new example
4. **Ensure completeness:**
   - Error handling in all steps
   - Input validation
   - Output definition
   - Timeout configuration

---

## ✅ Example Quality Checklist

Each example should have:
- [ ] Valid JSON/YAML syntax
- [ ] Error handling for all steps
- [ ] Input parameter validation
- [ ] Output definition
- [ ] Timeout configuration
- [ ] Logging statements
- [ ] Sample payloads
- [ ] README documentation
- [ ] No hardcoded credentials

---

**These examples represent production-tested patterns. Use them as templates for generating new workflows!**
