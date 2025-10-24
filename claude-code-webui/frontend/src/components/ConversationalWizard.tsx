/**
 * Conversational AI Wizard Component - Cisco Themed
 *
 * Modern glassmorphism UI matching Cisco Agentic-AI-demos aesthetic
 * AI-driven conversational wizards using Claude Code
 */

import React, { useState } from 'react';

interface ConversationalWizardProps {
  onSendMessage: (message: string) => void;
}

const conversationalWizardPrompts = {
  'html-website': {
    title: 'HTML Website Generator',
    description: 'AI will guide you through creating a professional website',
    icon: '🌐',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    systemPrompt: `You are an expert web developer and designer helping create a custom HTML website.

Your task is to interview the user step-by-step to gather all necessary requirements, then generate a complete, production-ready HTML website.

**Interview Process:**
1. Start by warmly greeting the user and explaining you'll help them create a website
2. Ask questions ONE AT A TIME in a conversational manner
3. Wait for their answer before asking the next question
4. Ask clarifying questions if answers are vague
5. Provide suggestions and examples when helpful

**Questions to Ask (in order):**
1. What type of website do they need? (personal portfolio, business, blog, landing page, e-commerce, etc.)
2. What is the website title/name?
3. What is the company/personal name to display?
4. What color scheme do they prefer? (offer suggestions: modern blue, elegant dark, fresh green, warm orange, professional gray, vibrant purple)
5. What sections should the website have? (suggest: Header, About, Services, Portfolio, Testimonials, Contact)
6. What special features do they want? (contact form, image gallery, animations, video background, newsletter signup, social media links)
7. Do they have any specific content or text they want included?
8. What SEO keywords should be optimized for?
9. Any specific design preferences or inspirations?

**After gathering all information:**
- Summarize what you understood
- Ask if they'd like to change anything
- Then generate a COMPLETE, PRODUCTION-READY HTML website with:
  * Clean, modern, responsive design
  * Inline CSS with mobile-first approach
  * JavaScript for smooth interactions
  * Proper semantic HTML5
  * SEO-optimized meta tags
  * Accessibility features (ARIA labels, alt tags)
  * Browser compatibility
  * Comments explaining key sections
  * Ready to deploy (single HTML file)

**Tone:** Friendly, professional, helpful.

Start by introducing yourself and asking the first question!`
  },

  'cisco-nso': {
    title: 'Cisco NSO Package Generator',
    description: 'Expert AI architect for production-ready NSO service packages with YANG, templates, and validation',
    icon: '📦',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    systemPrompt: `You are a Cisco NSO expert and automation architect helping create a custom NSO service package.

Your task is to interview the user step-by-step to understand their network automation needs, then generate a complete, production-ready NSO package.

**Interview Process:**
1. Greet the user and explain you'll help create an NSO service package
2. Ask questions ONE AT A TIME conversationally
3. Provide expert recommendations based on their answers
4. Ask clarifying questions about technical details
5. Offer examples from best practices

**Questions to Ask (in order):**
1. What is the service package name? (suggest format: lowercase-with-hyphens)
2. Briefly describe what this service does
3. What device platform will this target? (Cisco IOS, IOS-XE, IOS-XR, NX-OS, ASA, Juniper JUNOS, etc.)
4. What type of service is this? (L3VPN, L2VPN, QoS, ACL, VLAN, Interface, Routing, NAT, Firewall, etc.)
5. What are the key variables/parameters users should configure?
6. What CLI commands should be generated?
7. What validation rules are needed?
8. Should there be custom actions?
9. Any dependencies on other packages or NEDs?

**After gathering all information:**
- Summarize the service package design
- Confirm details with the user
- Generate a COMPLETE NSO package with YANG model, XML templates, Python service code, and documentation

**Tone:** Technical expert, patient teacher, thorough.

Start by introducing yourself and asking the first question!`
  },

  'crosswork-workflow': {
    title: 'Crosswork Workflow Generator',
    description: 'Expert AI for complete automation workflows with triggers, error handling, and rollback',
    icon: '⚙️',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    systemPrompt: `You are a Cisco Crosswork automation expert helping design and create custom workflows.

Your task is to interview the user about their automation needs and generate a complete, production-ready Crosswork workflow.

**Interview Process:**
1. Welcome the user and explain you'll help design their workflow
2. Ask questions ONE AT A TIME in a consultative manner
3. Recommend best practices based on their needs
4. Ask about edge cases and error scenarios
5. Provide automation strategy guidance

**Questions to Ask (in order):**
1. What is the workflow name?
2. What problem does this workflow solve?
3. How should this workflow be triggered?
4. What input parameters does the workflow need?
5. What are the main steps/actions?
6. What should happen if a step fails?
7. What outputs/notifications are needed?
8. Any integration requirements?
9. Should there be approval gates or checkpoints?

**After gathering all information:**
- Summarize the complete workflow design
- Review error handling and edge cases
- Generate a COMPLETE workflow with metadata, trigger configuration, step definitions, error handlers, and documentation

**Tone:** Strategic consultant, automation expert, practical.

Start by introducing yourself and asking the first question!`
  },

  'python-script': {
    title: 'Python Automation Script',
    description: 'AI will create production-ready Python scripts',
    icon: '🐍',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    systemPrompt: `You are a senior Python developer specializing in network automation and DevOps.

Your task is to interview the user about their automation needs and generate clean, production-ready Python code.

**Questions to Ask:**
1. What does this script need to do?
2. What inputs will it receive?
3. What outputs should it produce?
4. What external systems does it interact with?
5. What libraries or frameworks should be used?
6. How should errors be handled?
7. Should it run as a one-time script or continuously?
8. Any performance or scalability requirements?

**After gathering information:**
- Generate production-ready Python code with proper structure, type hints, error handling, documentation, and tests

Start the conversation!`
  }
};

export const ConversationalWizard: React.FC<ConversationalWizardProps> = ({ onSendMessage }) => {
  const [showWizard, setShowWizard] = useState(false);

  const handleWizardStart = (wizardType: keyof typeof conversationalWizardPrompts) => {
    const wizard = conversationalWizardPrompts[wizardType];
    onSendMessage(wizard.systemPrompt);
    setShowWizard(false);
  };

  return (
    <>
      {/* Floating Wizard Button - Cisco Style */}
      <button
        onClick={() => setShowWizard(!showWizard)}
        className="fixed bottom-24 right-6 z-50 group"
        style={{
          background: 'linear-gradient(45deg, #00ff88, #00aaff)',
          padding: '16px',
          borderRadius: '50%',
          border: 'none',
          boxShadow: '0 8px 32px rgba(0, 255, 136, 0.4)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 255, 136, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 255, 136, 0.4)';
        }}
        title="AI Code Wizards"
      >
        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-6 w-6">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-6 w-6 bg-cyan-500 items-center justify-center text-xs font-bold text-black">
            AI
          </span>
        </span>
      </button>

      {/* Modal - Glassmorphism Cisco Style */}
      {showWizard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <div
            className="w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)',
              border: '1px solid rgba(155, 89, 182, 0.3)',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              padding: '40px'
            }}
          >
            {/* Header with Cisco Branding */}
            <div className="text-center mb-10">
              {/* Cisco Logo */}
              <div className="flex justify-center items-center gap-4 mb-6">
                <svg className="h-12 w-auto" viewBox="0 0 100 50" fill="currentColor">
                  <g style={{ color: '#00bceb' }}>
                    <rect x="10" y="15" width="4" height="20" rx="2"/>
                    <rect x="20" y="10" width="4" height="30" rx="2"/>
                    <rect x="30" y="5" width="4" height="40" rx="2"/>
                    <rect x="40" y="10" width="4" height="30" rx="2"/>
                    <rect x="50" y="15" width="4" height="20" rx="2"/>
                    <rect x="60" y="10" width="4" height="30" rx="2"/>
                    <rect x="70" y="5" width="4" height="40" rx="2"/>
                    <rect x="80" y="10" width="4" height="30" rx="2"/>
                    <rect x="90" y="15" width="4" height="20" rx="2"/>
                  </g>
                </svg>
                <h2
                  className="text-4xl font-bold"
                  style={{
                    background: 'linear-gradient(45deg, #9b59b6, #e74c3c)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  AI Code Wizards
                </h2>
              </div>

              <p className="text-gray-300 text-lg mb-3">
                Powered by Claude AI - Conversational Code Generation
              </p>
              <div
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: 'rgba(0, 255, 136, 0.1)',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  color: '#00ff88'
                }}
              >
                ✨ Choose a wizard • Claude asks questions • Get production-ready code
              </div>
            </div>

            {/* Wizard Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {Object.entries(conversationalWizardPrompts).map(([key, wizard]) => (
                <button
                  key={key}
                  onClick={() => handleWizardStart(key as keyof typeof conversationalWizardPrompts)}
                  className="group relative text-left transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(155, 89, 182, 0.2)',
                    borderRadius: '16px',
                    padding: '24px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(155, 89, 182, 0.3)';
                    e.currentTarget.style.borderColor = 'rgba(155, 89, 182, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(155, 89, 182, 0.2)';
                  }}
                >
                  {/* Gradient Background Effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-16px"
                    style={{ background: wizard.gradient }}
                  />

                  {/* Content */}
                  <div className="relative">
                    {/* Icon */}
                    <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                      {wizard.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      {wizard.title}
                      <svg
                        className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: '#00ff88' }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {wizard.description}
                    </p>

                    {/* AI Badge */}
                    <div className="absolute top-0 right-0">
                      <span
                        className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full"
                        style={{
                          background: 'linear-gradient(45deg, #00ff88, #00aaff)',
                          color: '#000'
                        }}
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 7H7v6h6V7z"/>
                          <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd"/>
                        </svg>
                        AI Powered
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Info Panel */}
            <div
              className="rounded-xl p-6 mb-6"
              style={{
                background: 'rgba(0, 188, 235, 0.05)',
                border: '1px solid rgba(0, 188, 235, 0.2)'
              }}
            >
              <div className="flex items-start gap-4">
                <svg
                  className="w-8 h-8 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: '#00bceb' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-bold text-white mb-3 text-lg">How AI Wizards Work</h4>
                  <ul className="text-gray-300 space-y-2 text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span style={{ color: '#00ff88' }}>▸</span>
                      <span><strong>Conversational:</strong> Claude will ask you questions one at a time, just like talking to an expert</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: '#00ff88' }}>▸</span>
                      <span><strong>Adaptive:</strong> Your answers guide the next questions - Claude understands context</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: '#00ff88' }}>▸</span>
                      <span><strong>Intelligent:</strong> Ask Claude for suggestions, clarifications, or best practices anytime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: '#00ff88' }}>▸</span>
                      <span><strong>Complete:</strong> Once all requirements are gathered, receive production-ready, fully documented code</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span style={{ color: '#00ff88' }}>▸</span>
                      <span><strong>Iterative:</strong> Review, refine, and iterate on the generated code with Claude's help</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowWizard(false)}
                className="px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};
