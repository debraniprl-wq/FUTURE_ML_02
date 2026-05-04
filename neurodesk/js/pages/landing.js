const LandingPage = {
  render() {
    return `
      <div class="landing-hero">
        <div class="hero-badge">NeuroDesk 2.0 is live!</div>
        <h1 class="hero-title">Automate Support.<br><span class="hero-title-gradient">Resolve Faster.</span> Scale Smarter.</h1>
        <p class="hero-subtitle">
          The premium AI-powered support intelligence platform that automatically classifies, prioritizes, and analyzes customer support tickets in real time.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary" onclick="App.navigate('dashboard')">View Dashboard</button>
          <button class="btn btn-secondary" onclick="App.navigate('analyze')">Try Analyzer</button>
        </div>
      </div>

      <div class="features-grid">
        <div class="feature-card glass-panel">
          <div class="feature-icon"><i data-lucide="zap"></i></div>
          <h3 class="feature-title">Real-Time Classification</h3>
          <p class="feature-desc">Instantly categorize incoming tickets into Billing, Tech, or General Queries using advanced NLP.</p>
        </div>
        <div class="feature-card glass-panel">
          <div class="feature-icon"><i data-lucide="alert-triangle"></i></div>
          <h3 class="feature-title">Smart Prioritization</h3>
          <p class="feature-desc">Never miss a critical issue. AI automatically flags urgent tickets to prevent SLA breaches.</p>
        </div>
        <div class="feature-card glass-panel">
          <div class="feature-icon"><i data-lucide="bar-chart-2"></i></div>
          <h3 class="feature-title">Investor-Level Analytics</h3>
          <p class="feature-desc">Beautiful, interactive dashboards that provide deep insights into your support operations.</p>
        </div>
        <div class="feature-card glass-panel">
          <div class="feature-icon"><i data-lucide="upload-cloud"></i></div>
          <h3 class="feature-title">Bulk Processing</h3>
          <p class="feature-desc">Upload thousands of CSV tickets and let the model analyze them in seconds.</p>
        </div>
        <div class="feature-card glass-panel">
          <div class="feature-icon"><i data-lucide="brain"></i></div>
          <h3 class="feature-title">Explainable AI</h3>
          <p class="feature-desc">Clear confidence scores and highlighted keywords show exactly why a decision was made.</p>
        </div>
        <div class="feature-card glass-panel">
          <div class="feature-icon"><i data-lucide="lock"></i></div>
          <h3 class="feature-title">Enterprise Ready</h3>
          <p class="feature-desc">Role-based access, dark mode, and a highly polished UI designed for modern SaaS teams.</p>
        </div>
      </div>
    `;
  },
  
  init() {
    lucide.createIcons();
  }
};
