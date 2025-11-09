import React, { useMemo, useState, useEffect } from 'react';
import './Joblist.scss';

// Difficulty color mapping (basic badges)
const difficultyStyles = {
  Easy: 'diff-easy',
  Medium: 'diff-medium',
  Hard: 'diff-hard'
};

// Mock dataset (will be replaced by backend later)
const MOCK_JOBS = [
  { id: 1, company: 'Alpha Tech', industry: 'SE', title: 'Frontend Intern', difficulty: 'Medium', salary: '$250', location: 'Hanoi', createdAt: '2025-11-01' },
  { id: 2, company: 'Beta Vision', industry: 'FE', title: 'UI Prototype Intern', difficulty: 'Easy', salary: '$220', location: 'Da Nang', createdAt: '2025-11-06' },
  { id: 3, company: 'Creative Grid', industry: 'GD', title: 'Graphic Design Intern', difficulty: 'Medium', salary: '$230', location: 'HCMC', createdAt: '2025-11-05' },
  { id: 4, company: 'Insight Bank', industry: 'IB', title: 'Investment Research Intern', difficulty: 'Hard', salary: '$300', location: 'Hanoi', createdAt: '2025-10-28' },
  { id: 5, company: 'Scale Systems', industry: 'SE', title: 'Backend Intern', difficulty: 'Hard', salary: '$320', location: 'Remote', createdAt: '2025-11-04' },
  { id: 6, company: 'Pixel Forge', industry: 'GD', title: 'Visual Design Intern', difficulty: 'Easy', salary: '$200', location: 'HCMC', createdAt: '2025-11-02' }
];

export default function JobList({ defaultIndustry = 'SE' }) {
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState(defaultIndustry); // FE | IB | GD | SE
  const [sortMode, setSortMode] = useState('newest'); // newest | best
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // When defaultIndustry changes (from CV major), sync initial state
  useEffect(() => {
    if (defaultIndustry && !query) {
      setIndustry(defaultIndustry);
    }
  }, [defaultIndustry, query]);

  const filtered = useMemo(() => {
    let list = jobs;
    if (industry) list = list.filter(j => j.industry === industry);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(j =>
        j.company.toLowerCase().includes(q) ||
        j.title.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      );
    }
    if (sortMode === 'newest') {
      list = [...list].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortMode === 'best') {
      // naive: easiest difficulty first then newest
      const rank = { Easy: 1, Medium: 2, Hard: 3 };
      list = [...list].sort((a,b) => rank[a.difficulty] - rank[b.difficulty] || (new Date(b.createdAt) - new Date(a.createdAt)));
    }
    return list;
  }, [jobs, industry, query, sortMode]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate fetch delay
    setTimeout(() => {
      // Placeholder: in real fetch, update jobs state from API
      setJobs(prev => [...prev]);
      setIsRefreshing(false);
    }, 800);
  };

  return (
    <div className="joblist-root">
      <div className="joblist-header">
        <h2 className="joblist-title">Internship Opportunities</h2>
        <div className="joblist-controls">
          <input
            className="jl-input"
            placeholder="Search company, title, location..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="jl-select"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          >
            <option value="">All</option>
            <option value="SE">SE</option>
            <option value="FE">FE</option>
            <option value="IB">IB</option>
            <option value="GD">GD</option>
          </select>
          <div className="jl-seg">
            <button
              className={sortMode === 'newest' ? 'active' : ''}
              onClick={() => setSortMode('newest')}
            >Newest</button>
            <button
              className={sortMode === 'best' ? 'active' : ''}
              onClick={() => setSortMode('best')}
            >Best Match</button>
          </div>
          <button className="jl-refresh" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>

      <div className="joblist-table-wrapper">
        <table className="joblist-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Industry</th>
              <th>Role</th>
              <th>Difficulty</th>
              <th>Salary</th>
              <th>Location</th>
              <th>Posted</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="jl-empty">No jobs found.</td>
              </tr>
            )}
            {filtered.map(job => (
              <tr key={job.id}>
                <td>{job.company}</td>
                <td>{job.industry}</td>
                <td>{job.title}</td>
                <td><span className={`jl-badge ${difficultyStyles[job.difficulty]}`}>{job.difficulty}</span></td>
                <td>{job.salary}</td>
                <td>{job.location}</td>
                <td>{job.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
