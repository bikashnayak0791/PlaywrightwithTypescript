import 'dotenv/config';
import { chromium } from 'playwright';
import { PlaywrightAgent } from 'playwright-agent';

async function runPlaywrightAgentDemo() {
  console.log('🚀 Starting Playwright Agent Demo...');

  // Launch browser
  const browser = await chromium.launch({
    headless: false, // Set to true for headless mode
  });

  const page = await browser.newPage();

  // Navigate to the application
  await page.goto('http://127.0.0.1/auditairface/');

  // Initialize the AI agent
  const agent = new PlaywrightAgent({
    page,
    model: process.env.OPENAI_MODEL || process.env.MODEL || 'gpt-4',
    apiKey: process.env.OPENAI_API_KEY || process.env.API_KEY || '',
    baseURL: process.env.OPENAI_BASE_URL || process.env.BASE_URL,
  });

  try {
    // Example tasks the agent can perform
    console.log('📝 Executing AI-powered tasks...');

    // Task 1: Navigate and interact with login
    const loginResult = await agent.execute(
      'Navigate to the login page and fill in the username field with "testuser"'
    );
    console.log('Login task result:', loginResult.success);

    // Task 2: Perform dashboard actions
    const dashboardResult = await agent.execute(
      'Click on the dashboard menu and verify the page loads'
    );
    console.log('Dashboard task result:', dashboardResult.success);

    // Task 3: Location management
    const locationResult = await agent.execute(
      'Go to settings, click location, and check if location headers are displayed'
    );
    console.log('Location task result:', locationResult.success);

  } catch (error) {
    console.error('❌ Error during agent execution:', error);
  } finally {
    // Clean up
    agent.dispose();
    await browser.close();
    console.log('✅ Demo completed and browser closed.');
  }
}

// Run the demo
if (require.main === module) {
  runPlaywrightAgentDemo().catch(console.error);
}

export { runPlaywrightAgentDemo };