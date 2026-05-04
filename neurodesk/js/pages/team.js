const TeamPage = {
  render() {
    return `
      <div style="max-width: 1200px; margin: 0 auto;">
        <div style="margin-bottom: 32px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h2 class="card-title" style="font-size:1.5rem;margin-bottom:8px">Team Performance</h2>
            <p style="color:var(--text-secondary)">Monitor agent efficiency and SLA compliance across all teams.</p>
          </div>
          <button class="btn btn-secondary"><i data-lucide="download"></i> Export Report</button>
        </div>

        <div class="dashboard-grid">
          
          <div class="kpi-row">
            <div class="card kpi-card animate-hover">
              <div class="kpi-header">
                <span>Active Agents</span>
                <div class="kpi-icon" style="background:rgba(0,212,255,0.1);color:var(--accent-color)"><i data-lucide="users"></i></div>
              </div>
              <div class="kpi-value">24</div>
              <div class="kpi-trend trend-up">Online right now</div>
            </div>
            <div class="card kpi-card animate-hover">
              <div class="kpi-header">
                <span>Avg Response Time</span>
                <div class="kpi-icon"><i data-lucide="clock"></i></div>
              </div>
              <div class="kpi-value">45m</div>
              <div class="kpi-trend trend-up"><i data-lucide="trending-up" style="width:14px;height:14px"></i> 12% faster this week</div>
            </div>
            <div class="card kpi-card animate-hover">
              <div class="kpi-header">
                <span>SLA Compliance</span>
                <div class="kpi-icon" style="background:rgba(0,229,160,0.1);color:var(--success-color)"><i data-lucide="check-circle"></i></div>
              </div>
              <div class="kpi-value">98.2%</div>
              <div class="kpi-trend trend-up"><i data-lucide="trending-up" style="width:14px;height:14px"></i> Target is 95%</div>
            </div>
            <div class="card kpi-card animate-hover">
              <div class="kpi-header">
                <span>Customer Sat. (CSAT)</span>
                <div class="kpi-icon" style="background:rgba(255,179,71,0.1);color:var(--warning-color)"><i data-lucide="star"></i></div>
              </div>
              <div class="kpi-value">4.8/5</div>
              <div class="kpi-trend trend-up">Based on 1,240 ratings</div>
            </div>
          </div>

          <div class="card" style="grid-column: span 12;">
            <div class="card-title">Agent Leaderboard</div>
            <div class="table-container">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Agent Name</th>
                    <th>Team</th>
                    <th>Tickets Resolved (Week)</th>
                    <th>Avg Resolution Time</th>
                    <th>CSAT Score</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="display:flex;align-items:center;gap:12px;">
                      <div class="user-avatar" style="width:32px;height:32px;font-size:0.75rem;">AD</div>
                      <span style="font-weight:500">Agnimitra Dey</span>
                    </td>
                    <td><span class="team-badge team-tech">Technical</span></td>
                    <td style="font-weight:600">142</td>
                    <td>1.2h</td>
                    <td style="color:var(--warning-color)">4.9 <i data-lucide="star" style="width:14px;height:14px;fill:currentColor"></i></td>
                    <td><span class="status-dot status-resolved" style="background:currentColor"></span>Online</td>
                  </tr>
                  <tr>
                    <td style="display:flex;align-items:center;gap:12px;">
                      <div class="user-avatar" style="width:32px;height:32px;font-size:0.75rem;background:linear-gradient(135deg, #FF4D6D, #FFB347)">SJ</div>
                      <span style="font-weight:500">Sarah Jenkins</span>
                    </td>
                    <td><span class="team-badge team-billing">Billing</span></td>
                    <td style="font-weight:600">118</td>
                    <td>45m</td>
                    <td style="color:var(--warning-color)">4.8 <i data-lucide="star" style="width:14px;height:14px;fill:currentColor"></i></td>
                    <td><span class="status-dot status-resolved" style="background:currentColor"></span>Online</td>
                  </tr>
                  <tr>
                    <td style="display:flex;align-items:center;gap:12px;">
                      <div class="user-avatar" style="width:32px;height:32px;font-size:0.75rem;background:linear-gradient(135deg, #00D4FF, #00E5A0)">MR</div>
                      <span style="font-weight:500">Mike Ross</span>
                    </td>
                    <td><span class="team-badge team-support">Support</span></td>
                    <td style="font-weight:600">95</td>
                    <td>25m</td>
                    <td style="color:var(--warning-color)">4.7 <i data-lucide="star" style="width:14px;height:14px;fill:currentColor"></i></td>
                    <td><span class="status-dot status-open" style="background:currentColor"></span>Away</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  
  init() {}
};
