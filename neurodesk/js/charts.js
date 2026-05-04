// Global Chart Config
Chart.defaults.color = 'var(--text-secondary)';
Chart.defaults.font.family = 'var(--font-sans)';

const AppCharts = {
  instances: {},

  renderCategoryChart(ctxId, data) {
    const ctx = document.getElementById(ctxId);
    if (!ctx) return;
    
    if (this.instances[ctxId]) {
      this.instances[ctxId].destroy();
    }

    // Get categories and counts
    const counts = {};
    data.forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });

    const labels = Object.keys(counts);
    const values = Object.values(counts);

    this.instances[ctxId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            '#6C63FF', '#00D4FF', '#FF4D6D', '#00E5A0', '#FFB347', '#A0A0AB'
          ],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { color: 'var(--text-primary)' }
          }
        },
        cutout: '70%'
      }
    });
  },

  renderPriorityChart(ctxId, data) {
    const ctx = document.getElementById(ctxId);
    if (!ctx) return;

    if (this.instances[ctxId]) {
      this.instances[ctxId].destroy();
    }

    const counts = { 'Critical': 0, 'High': 0, 'Medium': 0, 'Low': 0 };
    data.forEach(t => {
      if (counts[t.priority] !== undefined) {
        counts[t.priority]++;
      }
    });

    this.instances[ctxId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Critical', 'High', 'Medium', 'Low'],
        datasets: [{
          label: 'Tickets',
          data: [counts['Critical'], counts['High'], counts['Medium'], counts['Low']],
          backgroundColor: [
            'rgba(255, 77, 109, 0.8)',
            'rgba(255, 179, 71, 0.8)',
            'rgba(0, 212, 255, 0.8)',
            'rgba(107, 107, 118, 0.8)'
          ],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'var(--border-color)' },
            ticks: { color: 'var(--text-secondary)' }
          },
          x: {
            grid: { display: false },
            ticks: { color: 'var(--text-secondary)' }
          }
        }
      }
    });
  },

  renderTrendChart(ctxId, data) {
    const ctx = document.getElementById(ctxId);
    if (!ctx) return;

    if (this.instances[ctxId]) {
      this.instances[ctxId].destroy();
    }

    // Group by date (last 7 days mock)
    const dates = [];
    const counts = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      dates.push(d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }));
      // Mock count based on data length
      counts.push(Math.floor(Math.random() * (data.length / 5)) + 5);
    }

    this.instances[ctxId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Ticket Volume',
          data: counts,
          borderColor: '#6C63FF',
          backgroundColor: 'rgba(108, 99, 255, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'var(--border-color)' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }
};
