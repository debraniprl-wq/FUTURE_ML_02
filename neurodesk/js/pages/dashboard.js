const DashboardPage = {
  render() {
    return `
      <div class="dashboard-grid">
        <div style="grid-column: span 12; display: flex; justify-content: space-between; align-items: center; margin-bottom: -8px;">
          <h2 class="card-title" style="margin: 0;">Command Center</h2>
          <button class="btn btn-secondary" onclick="App.showToast('Exporting Data', 'Downloading dashboard_report.csv', 'info')">
            <i data-lucide="download"></i> Export Data
          </button>
        </div>

        <div class="kpi-row" id="kpi-container">
          <!-- KPIs rendered here -->
        </div>

        <div class="card chart-card animate-hover">
          <div class="card-title">Category Distribution</div>
          <div style="height: 250px; position: relative;">
            <canvas id="category-chart"></canvas>
          </div>
        </div>

        <div class="card chart-card animate-hover">
          <div class="card-title">Priority Volume</div>
          <div style="height: 250px; position: relative;">
            <canvas id="priority-chart"></canvas>
          </div>
        </div>

        <div class="card recent-tickets-card animate-hover">
          <div class="card-title">Active Tickets Queue <span class="badge badge-low" style="margin-left:auto">Live</span></div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Assignment</th>
                  <th>Priority & SLA</th>
                  <th>Confidence</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody id="recent-tickets-body">
                <!-- Rows here -->
              </tbody>
            </table>
          </div>
        </div>

        <div class="card activity-feed-card animate-hover">
          <div class="card-title">Live Activity</div>
          <div class="activity-list" id="activity-feed">
            <!-- Feed here -->
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const tickets = Storage.get('tickets');
    this.renderKPIs(tickets);
    this.renderTicketsTable(tickets);
    this.renderActivity(tickets);
    
    setTimeout(() => {
      AppCharts.renderCategoryChart('category-chart', tickets);
      AppCharts.renderPriorityChart('priority-chart', tickets);
    }, 100);

    // Simulated intervals
    this.simInterval = setInterval(() => {
      this.simulateNewTicket();
    }, 15000); // New ticket every 15s
    
    this.timerInterval = setInterval(() => {
      this.updateSLATimers();
    }, 60000); // Update SLA timers every minute
  },

  destroy() {
    if (this.simInterval) clearInterval(this.simInterval);
    if (this.timerInterval) clearInterval(this.timerInterval);
  },

  renderKPIs(tickets) {
    const container = document.getElementById('kpi-container');
    if(!container) return;

    const today = new Date();
    const todayTickets = tickets.filter(t => new Date(t.date).toDateString() === today.toDateString()).length;
    const critical = tickets.filter(t => t.priority === 'Critical').length;
    
    container.innerHTML = `
      <div class="card kpi-card animate-hover">
        <div class="kpi-header">
          <span>Total Processed</span>
          <div class="kpi-icon"><i data-lucide="layers"></i></div>
        </div>
        <div class="kpi-value">${tickets.length}</div>
        <div class="kpi-trend trend-up"><i data-lucide="trending-up" style="width:14px;height:14px"></i> +12% this week</div>
      </div>
      <div class="card kpi-card animate-hover">
        <div class="kpi-header">
          <span>Tickets Today</span>
          <div class="kpi-icon"><i data-lucide="calendar"></i></div>
        </div>
        <div class="kpi-value">${todayTickets || 12}</div>
        <div class="kpi-trend trend-down"><i data-lucide="trending-down" style="width:14px;height:14px"></i> -4% vs yesterday</div>
      </div>
      <div class="card kpi-card animate-hover" id="critical-kpi-card">
        <div class="kpi-header">
          <span>Critical Issues</span>
          <div class="kpi-icon" style="color:var(--danger-color);background:rgba(255,77,109,0.1)"><i data-lucide="alert-circle"></i></div>
        </div>
        <div class="kpi-value">${critical}</div>
        <div class="kpi-trend trend-up"><i data-lucide="trending-up" style="width:14px;height:14px"></i> +2 today</div>
      </div>
      <div class="card kpi-card animate-hover">
        <div class="kpi-header">
          <span>Avg Response</span>
          <div class="kpi-icon"><i data-lucide="clock"></i></div>
        </div>
        <div class="kpi-value">1.2h</div>
        <div class="kpi-trend trend-up"><i data-lucide="trending-up" style="width:14px;height:14px"></i> Faster than SLA</div>
      </div>
    `;
    lucide.createIcons({root: container});
  },

  renderTicketsTable(tickets) {
    const tbody = document.getElementById('recent-tickets-body');
    if(!tbody) return;

    const recent = tickets.slice(0, 6);
    
    tbody.innerHTML = recent.map(t => {
      let statusClass = t.status === 'Open' ? 'status-open' : (t.status === 'Resolved' ? 'status-resolved' : 'status-progress');
      let teamClass = '';
      if(t.team === 'Technical') teamClass = 'team-tech';
      else if(t.team === 'Billing') teamClass = 'team-billing';
      else teamClass = 'team-support';

      let emoji = t.sentiment === 'Angry' ? '😡' : (t.sentiment === 'Happy' ? '😊' : '😐');
      
      let confClass = t.confidence > 85 ? 'conf-high' : (t.confidence > 70 ? 'conf-med' : 'conf-low');

      return `
        <tr data-sla="${t.slaDeadline}" data-id="${t.id}">
          <td>
            <div style="font-family:var(--font-display);font-size:0.75rem;color:var(--text-muted)">${t.id}</div>
            <div style="font-weight:500;margin-top:2px;">
              <span class="sentiment-emoji" title="${t.sentiment}">${emoji}</span> ${t.subject}
            </div>
          </td>
          <td>
            <div style="color:var(--text-secondary);font-size:0.875rem;margin-bottom:4px;">${t.category}</div>
            <span class="team-badge ${teamClass}">${t.team}</span>
          </td>
          <td>
            <div style="margin-bottom:4px;"><span class="badge badge-${t.priority.toLowerCase()}">${t.priority}</span></div>
            <div class="sla-timer" id="timer-${t.id}">--:--</div>
          </td>
          <td style="width: 120px;">
            <div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:4px;">
              <span>AI Match</span>
              <span style="font-weight:600">${t.confidence}%</span>
            </div>
            <progress value="${t.confidence}" max="100" class="${confClass}"></progress>
          </td>
          <td>
            <div style="display:flex;align-items:center;">
              <span class="status-dot ${statusClass}" style="background:currentColor"></span>
              ${t.status}
            </div>
          </td>
        </tr>
      `;
    }).join('');

    this.updateSLATimers();
  },

  updateSLATimers() {
    const rows = document.querySelectorAll('tr[data-sla]');
    const now = new Date();
    
    rows.forEach(row => {
      const deadline = new Date(row.getAttribute('data-sla'));
      const id = row.getAttribute('data-id');
      const timerEl = document.getElementById(`timer-${id}`);
      
      if(!timerEl) return;

      const diff = deadline - now;
      if (diff <= 0) {
        timerEl.textContent = 'BREACHED';
        timerEl.className = 'sla-timer danger';
        row.classList.add('sla-breach');
        return;
      }

      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      timerEl.textContent = `${hrs}h ${mins}m left`;
      
      if (hrs < 1) {
        timerEl.className = 'sla-timer danger';
        row.classList.add('sla-breach');
      } else if (hrs < 4) {
        timerEl.className = 'sla-timer warning';
      } else {
        timerEl.className = 'sla-timer';
      }
    });
  },

  renderActivity(tickets) {
    const feed = document.getElementById('activity-feed');
    if(!feed) return;

    const recent = tickets.slice(0, 5);
    feed.innerHTML = recent.map((t, i) => {
      const timeStr = i === 0 ? 'Just now' : `${i*2}m ago`;
      const dotColor = t.priority === 'Critical' ? 'var(--danger-color)' : 'var(--primary-color)';
      return `
        <div class="activity-item">
          <div class="activity-dot" style="background:${dotColor}"></div>
          <div class="activity-content">
            <div class="activity-title">Routed ${t.priority} ticket to ${t.team}</div>
            <div class="activity-desc">Auto-classified as ${t.category} (${t.confidence}%)</div>
            <div class="activity-time">${timeStr}</div>
          </div>
        </div>
      `;
    }).join('');
  },

  simulateNewTicket() {
    if (window.location.hash !== '#/dashboard') return;

    const tickets = Storage.get('tickets');
    const newTkt = MockData.generateTickets(1)[0];
    newTkt.id = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    newTkt.date = new Date().toISOString();
    newTkt.slaDeadline = new Date(Date.now() + MockData.slaHours[newTkt.priority] * 3600000).toISOString();
    newTkt.status = 'Open';
    
    tickets.unshift(newTkt);
    Storage.set('tickets', tickets);
    
    this.renderKPIs(tickets);
    this.renderTicketsTable(tickets);
    this.renderActivity(tickets);
    AppCharts.renderCategoryChart('category-chart', tickets);
    AppCharts.renderPriorityChart('priority-chart', tickets);

    if (newTkt.priority === 'Critical') {
      const card = document.getElementById('critical-kpi-card');
      if (card) {
        card.classList.add('sla-breach');
        setTimeout(() => card.classList.remove('sla-breach'), 3000);
      }
      App.showToast('Critical Ticket Routed', `Assigned to ${newTkt.team} team immediately.`, 'warning');
      App.addNotification(`Critical SLA Risk: ${newTkt.id} requires response in 2 hours.`, 'warning');
    }
  }
};
