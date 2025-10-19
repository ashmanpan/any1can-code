const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Claude API endpoint
app.post('/generate-code', async (req, res) => {
    const { apiKey, projectType, userInputs } = req.body;

    if (!apiKey) {
        return res.status(400).json({ error: 'API key is required' });
    }

    try {
        // Call Claude API with user's key
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 4000,
                messages: [{
                    role: 'user',
                    content: buildPrompt(projectType, userInputs)
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`Claude API error: ${response.statusText}`);
        }

        const data = await response.json();
        const generatedCode = data.content[0].text;

        res.json({
            success: true,
            code: generatedCode
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: 'Failed to generate code',
            details: error.message
        });
    }
});

// Build prompt based on project type and inputs
function buildPrompt(projectType, inputs) {
    const prompts = {
        'html-website': `Create a complete HTML website with the following specifications:
            - Website type: ${inputs.websiteType}
            - Title: ${inputs.title}
            - Color scheme: ${inputs.colorScheme}
            - Sections: ${inputs.sections}
            Generate complete HTML with inline CSS and JavaScript.`,

        'cisco-nso': `Generate a Cisco NSO package with:
            - Package name: ${inputs.packageName}
            - Device type: ${inputs.deviceType}
            - Service type: ${inputs.serviceType}
            Include YANG models and Python code.`,

        'crosswork-workflow': `Create a Cisco Crosswork workflow:
            - Workflow name: ${inputs.workflowName}
            - Trigger type: ${inputs.triggerType}
            - Actions: ${inputs.actions}
            Generate the complete workflow JSON/YAML.`
    };

    return prompts[projectType] || 'Generate code based on: ' + JSON.stringify(inputs);
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});