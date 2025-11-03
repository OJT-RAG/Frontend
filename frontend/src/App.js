import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './component/login/Login';
import SignUp from './component/signup/SignUp';
import ForgotPassword from './component/forgotpassword/ForgotPassword';
import CV from './component/profile/CV';
import './component/login/Login.scss';
import HomePage from './component/homepage/HomePage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile/cv" element={<CV />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
