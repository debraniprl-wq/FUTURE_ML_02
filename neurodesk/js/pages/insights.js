const InsightsPage = {
  render() {
    return `
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h2 class="card-title" style="font-size:1.5rem;margin-bottom:8px">Deep Insights</h2>
            <p style="color:var(--text-secondary)">AI-generated analytics and trends across all your support channels.</p>
          </div>
          <button class="btn btn-primary" onclick="App.showToast('Exporting Report', 'Preparing insights_report.pdf', 'info')">
            <i data-lucide="download"></i> Export PDF Report
          </button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(12, 1fr);gap:24px;">
          
          <div class="card animate-hover" style="grid-column:span 12">
            <div class="card-title">Ticket Volume Trend (Last 7 Days)</div>
            <div style="height:300px;position:relative;">
              <canvas id="trend-chart"></canvas>
            </div>
          </div>

          <div class="card animate-hover" style="grid-column:span 6">
            <div class="card-title"><i data-lucide="brain" style="color:var(--accent-color);margin-right:8px"></i> AI Executive Summary</div>
            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-dot" style="background:var(--danger-color)"></div>
                <div class="activity-content">
                  <div class="activity-title" style="color:var(--danger-color)">High volume of "Login" issues detected</div>
                  <div class="activity-desc">Sentiment analysis shows high user frustration (😡 68%). Consider updating the password reset documentation immediately.</div>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-dot" style="background:var(--warning-color)"></div>
                <div class="activity-content">
                  <div class="activity-title">Billing queries peaking on 1st of month</div>
                  <div class="activity-desc">Proactively send invoice explanation emails to reduce ticket volume by an estimated 14%.</div>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-dot" style="background:var(--success-color)"></div>
                <div class="activity-content">
                  <div class="activity-title">Resolution time improved by 15%</div>
                  <div class="activity-desc">Automated classification is successfully routing tickets to the right agents faster. SLA compliance is up to 98%.</div>
                </div>
              </div>
            </div>
          </div>

          <div class="card animate-hover" style="grid-column:span 6">
            <div class="card-title">Trending Tags (Auto-Extracted)</div>
            <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:16px;">
              <span class="tag-chip" style="font-size:1.25rem;border-color:var(--primary-color);color:var(--primary-color)">#password</span>
              <span class="tag-chip" style="font-size:1.1rem;border-color:var(--accent-color);color:var(--accent-color)">#refund</span>
              <span class="tag-chip" style="font-size:1.5rem;border-color:var(--danger-color);color:var(--danger-color);background:rgba(255,77,109,0.1)">#500_error</span>
              <span class="tag-chip" style="font-size:0.9rem">#export_csv</span>
              <span class="tag-chip" style="font-size:1rem">#integration</span>
              <span class="tag-chip" style="font-size:1.3rem">#dashboard_blank</span>
              <span class="tag-chip" style="font-size:1.1rem">#subscription</span>
              <span class="tag-chip" style="font-size:0.85rem">#api_webhook</span>
              <span class="tag-chip" style="font-size:1.4rem;border-color:var(--warning-color);color:var(--warning-color)">#latency</span>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  init() {
    const tickets = Storage.get('tickets');
    setTimeout(() => {
      AppCharts.renderTrendChart('trend-chart', tickets);
    }, 100);
  }
};
