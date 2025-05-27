import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type VerificationStatus = 'SAFE' | 'NSFW' | 'DUBIOUS';

interface VerificationResultProps {
  status: VerificationStatus;
  serverName: string;
  reason: string;
}

const VerificationResult: React.FC<VerificationResultProps> = ({ 
  status, 
  serverName, 
  reason 
}) => {
  const getStatusContent = () => {
    switch (status) {
      case 'SAFE':
        return {
          icon: <CheckCircle size={48} className="text-green-500" />,
          title: 'Server Approved!',
          description: 'Your server has been verified and is now listed on our platform.',
          color: 'green',
          actionText: 'View Your Server'
        };
      case 'NSFW':
        return {
          icon: <XCircle size={48} className="text-red-500" />,
          title: 'Server Rejected',
          description: 'Your server contains content that violates our community guidelines.',
          color: 'red',
          actionText: 'Submit a Different Server'
        };
      case 'DUBIOUS':
        return {
          icon: <AlertTriangle size={48} className="text-yellow-500" />,
          title: 'Manual Review Required',
          description: 'Your server has been flagged for manual review by our team.',
          color: 'yellow',
          actionText: 'Back to Home'
        };
      default:
        return {
          icon: <AlertTriangle size={48} className="text-gray-500" />,
          title: 'Unknown Status',
          description: 'We couldn\'t determine the status of your server.',
          color: 'gray',
          actionText: 'Back to Home'
        };
    }
  };
  
  const content = getStatusContent();
  const getBgColor = () => {
    switch (content.color) {
      case 'green': return 'bg-green-900/20 border-green-700/30';
      case 'red': return 'bg-red-900/20 border-red-700/30';
      case 'yellow': return 'bg-yellow-900/20 border-yellow-700/30';
      default: return 'bg-gray-800 border-gray-700';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl p-8 shadow-lg border ${getBgColor()} max-w-2xl mx-auto text-center`}
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className="flex justify-center mb-6"
      >
        {content.icon}
      </motion.div>
      
      <h2 className="text-2xl font-bold text-white mb-4">{content.title}</h2>
      
      <div className="mb-6">
        <p className="text-lg font-medium text-white">{serverName}</p>
        <p className="text-gray-300 mb-4">{content.description}</p>
        <div className="bg-gray-800/70 p-4 rounded-lg text-gray-300 text-sm">
          <p className="mb-2 font-medium">Reason:</p>
          <p>{reason}</p>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Link 
          to={status === 'SAFE' ? '/servers/1' : status === 'NSFW' ? '/submit' : '/'}
          className={`
            px-6 py-2 rounded-lg font-medium flex items-center
            ${status === 'SAFE' ? 'bg-green-600 hover:bg-green-700' : 
              status === 'NSFW' ? 'bg-blue-600 hover:bg-blue-700' : 
              'bg-blue-600 hover:bg-blue-700'} 
            text-white transition-colors
          `}
        >
          <span>{content.actionText}</span>
          <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </motion.div>
  );
};

export default VerificationResult;