
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import JobDetail from './pages/JobDetail';
import ApplyForm from './pages/ApplyForm';
import PostJobInfo from './pages/PostJobInfo';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import TermsPrivacy from './pages/TermsPrivacy';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/apply/:id" element={<ApplyForm />} />
          <Route path="/post-job" element={<PostJobInfo />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/terms" element={<TermsPrivacy type="terms" />} />
          <Route path="/privacy" element={<TermsPrivacy type="privacy" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
