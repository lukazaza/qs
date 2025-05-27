import React, { useEffect } from 'react';
import VerificationResult from '../components/VerificationResult';

const VerifyPage: React.FC = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Server Verification Result | ReloadWeb';
  }, []);

  // In a real app, this would be determined by the AI verification
  // and passed through context or fetched from an API
  const verificationStatus: 'SAFE' | 'NSFW' | 'DUBIOUS' = 'SAFE';
  const serverName = "Gaming Haven";
  const reason = "Content meets community guidelines and is appropriate for all audiences.";

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">AI Verification Result</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Our AI system has analyzed your server content for compliance with our community guidelines.
        </p>
      </div>
      
      <VerificationResult 
        status={verificationStatus}
        serverName={serverName}
        reason={reason}
      />
    </div>
  );
};

export default VerifyPage;