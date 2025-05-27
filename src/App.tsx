import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import RankedPage from './pages/RankedPage';
import SubmitPage from './pages/SubmitPage';
import ServerDetailPage from './pages/ServerDetailPage';
import SearchPage from './pages/SearchPage';
import VerifyPage from './pages/VerifyPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import Layout from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ranked" element={<RankedPage />} />
              <Route path="/submit" element={<SubmitPage />} />
              <Route path="/servers/:id" element={<ServerDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/verify" element={<VerifyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;