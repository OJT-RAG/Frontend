import React from 'react';

const DashboardOverview = () => {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>System-wide statistics and alerts</p>
      </div>

      <div className="grid-cols-4">
        <div className="card">
          <h3>Students Interning</h3>
          <div className="stat-value">1,234</div>
        </div>
        <div className="card">
          <h3>Active Jobs</h3>
          <div className="stat-value">567</div>
        </div>
        <div className="card">
          <h3>Company Approvals</h3>
          <div className="stat-value">89</div>
        </div>
        <div className="card">
          <h3>Pending Alerts</h3>
          <div className="stat-value text-red">12</div>
        </div>
      </div>

      <div className="grid-cols-2">
        <div className="card">
          <h3>Heatmap by Major</h3>
          <div className="chart-placeholder">[Heatmap Chart Placeholder]</div>
        </div>
        <div className="card">
          <h3>Recent Activity</h3>
          <div className="list-placeholder">[Activity List Placeholder]</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
