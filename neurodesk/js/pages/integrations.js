const IntegrationsPage = {
  render() {
    return `
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="margin-bottom: 32px;">
          <h2 class="card-title" style="font-size:1.5rem;margin-bottom:8px">App Integrations</h2>
          <p style="color:var(--text-secondary)">Connect NeuroDesk to your existing workspace tools to enable auto-routing and sync.</p>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(350px, 1fr));gap:24px;">
          
          <div class="card integration-card animate-hover">
            <div style="display:flex;align-items:center;gap:16px;">
              <div class="integration-icon" style="color:#E01E5A">
                <i data-lucide="slack"></i>
              </div>
              <div>
                <div style="font-weight:600;font-size:1.125rem;">Slack</div>
                <div style="font-size:0.875rem;color:var(--text-secondary)">Push notifications & alerts</div>
              </div>
            </div>
            <button class="btn btn-secondary" onclick="IntegrationsPage.toggleConnect(this)">Connect</button>
          </div>

          <div class="card integration-card animate-hover" style="border-color:var(--primary-color);box-shadow:var(--shadow-glow)">
            <div style="display:flex;align-items:center;gap:16px;">
              <div class="integration-icon" style="color:#03363D">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.02 0L24 11.98l-11.98 12L0 12.02 12.02 0zm5.17 17.15l2.67-2.67-7.84-7.84-2.67 2.67 7.84 7.84zm-7.84-7.84l-2.67 2.67 7.84 7.84 2.67-2.67-7.84-7.84zm0-5.34L1.51 11.81l2.67 2.67 7.84-7.84-2.67-2.67z"/></svg>
              </div>
              <div>
                <div style="font-weight:600;font-size:1.125rem;">Zendesk</div>
                <div style="font-size:0.875rem;color:var(--text-secondary)">Two-way ticket sync</div>
              </div>
            </div>
            <button class="btn btn-primary" onclick="IntegrationsPage.toggleConnect(this)">Connected</button>
          </div>

          <div class="card integration-card animate-hover">
            <div style="display:flex;align-items:center;gap:16px;">
              <div class="integration-icon" style="color:#EA4335">
                <i data-lucide="mail"></i>
              </div>
              <div>
                <div style="font-weight:600;font-size:1.125rem;">Gmail</div>
                <div style="font-size:0.875rem;color:var(--text-secondary)">Ingest support emails</div>
              </div>
            </div>
            <button class="btn btn-secondary" onclick="IntegrationsPage.toggleConnect(this)">Connect</button>
          </div>

          <div class="card integration-card animate-hover">
            <div style="display:flex;align-items:center;gap:16px;">
              <div class="integration-icon" style="color:#00A1E0">
                <i data-lucide="cloud"></i>
              </div>
              <div>
                <div style="font-weight:600;font-size:1.125rem;">Salesforce</div>
                <div style="font-size:0.875rem;color:var(--text-secondary)">Sync customer accounts</div>
              </div>
            </div>
            <button class="btn btn-secondary" onclick="IntegrationsPage.toggleConnect(this)">Connect</button>
          </div>

          <div class="card integration-card animate-hover">
            <div style="display:flex;align-items:center;gap:16px;">
              <div class="integration-icon" style="color:#FF4F00">
                <i data-lucide="webhook"></i>
              </div>
              <div>
                <div style="font-weight:600;font-size:1.125rem;">Zapier</div>
                <div style="font-size:0.875rem;color:var(--text-secondary)">Custom workflow triggers</div>
              </div>
            </div>
            <button class="btn btn-secondary" onclick="IntegrationsPage.toggleConnect(this)">Connect</button>
          </div>

          <div class="card integration-card animate-hover">
            <div style="display:flex;align-items:center;gap:16px;">
              <div class="integration-icon" style="color:var(--text-primary)">
                <i data-lucide="github"></i>
              </div>
              <div>
                <div style="font-weight:600;font-size:1.125rem;">GitHub</div>
                <div style="font-size:0.875rem;color:var(--text-secondary)">Link bugs to PRs/Issues</div>
              </div>
            </div>
            <button class="btn btn-secondary" onclick="IntegrationsPage.toggleConnect(this)">Connect</button>
          </div>

        </div>
      </div>
    `;
  },
  
  init() {},

  toggleConnect(btn) {
    if (btn.classList.contains('btn-primary')) {
      btn.className = 'btn btn-secondary';
      btn.textContent = 'Connect';
      btn.parentElement.style.borderColor = 'var(--glass-border)';
      btn.parentElement.style.boxShadow = 'var(--shadow-sm)';
      App.showToast('Disconnected', 'Integration has been removed.', 'info');
    } else {
      btn.className = 'btn btn-primary';
      btn.textContent = 'Connected';
      btn.parentElement.style.borderColor = 'var(--primary-color)';
      btn.parentElement.style.boxShadow = 'var(--shadow-glow)';
      App.showToast('Connected', 'Integration successfully linked.', 'success');
    }
  }
};
