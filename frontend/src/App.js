import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './component/login/Login';
import SignUp from './component/signup/SignUp';
import ForgotPassword from './component/forgotpassword/ForgotPassword';
import CV from './component/profile/CV';
import JobList from './component/profile/Joblist';
import JobDetail from './component/profile/Jobdetail';
import './component/login/Login.scss';
import HomePage from './component/homepage/HomePage';
import Dashboard from './component/pages/dashboard/Dashboard';
import OJT from './component/pages/pdf/OJT';
import Header from './component/homepage/Header';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/homepage" element={<HomePage />} />
  <Route path="/profile/cv" element={<CV />} />
  <Route path="/jobs" element={<JobList />} />
  <Route path="/jobs/:id" element={<JobDetail />} />
      <Route path="/ojt" element={<OJT />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
