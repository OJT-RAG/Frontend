import React, { useMemo, useState, useEffect } from 'react';
import './Joblist.scss';
import { Link } from 'react-router-dom';
import { JOBS } from './jobsData';

// Difficulty color mapping (basic badges)
const difficultyStyles = {
  Easy: 'diff-easy',
  Medium: 'diff-medium',
  Hard: 'diff-hard'
};

// Mock dataset (will be replaced by backend later)
const MOCK_JOBS = JOBS;

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
              <th>Detail</th>
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
                <td>
                  <Link className="jl-detail" to={`/jobs/${job.id}`}>Detail</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
