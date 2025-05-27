import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Server, Link as LinkIcon, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types/category';
import { apiMock } from '../utils/apiMock';
import { useTranslation } from 'react-i18next';

interface ServerSubmitFormProps {
  categories: Category[];
}

const ServerSubmitForm: React.FC<ServerSubmitFormProps> = ({ categories }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    description: '',
    fullDescription: '',
    inviteLink: '',
  });
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.description || !formData.inviteLink) {
      setFormError('Please fill out all required fields');
      return;
    }
    
    if (!formData.inviteLink.includes('discord.gg')) {
      setFormError('Please enter a valid Discord invite link');
      return;
    }
    
    setFormState('submitting');
    setFormError(null);
    
    try {
      const result = await apiMock.submitServer(formData);
      
      if (result.success) {
        setFormState('success');
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/verify');
        }, 2000);
      } else {
        throw new Error(result.error || 'Failed to submit server');
      }
    } catch (error) {
      setFormState('error');
      setFormError(error instanceof Error ? error.message : 'Something went wrong. Please try again later.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-xl p-6 shadow-xl max-w-2xl mx-auto"
    >
      {formState === 'success' ? (
        <div className="text-center py-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={32} className="text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">{t('submit.success.title')}</h2>
          <p className="text-gray-300 mb-6">
            {t('submit.success.message')}
          </p>
          <p className="text-gray-400 text-sm">
            {t('submit.success.redirect')}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-white mb-6">{t('submit.title')}</h2>
          
          {formError && (
            <div className="mb-6 p-3 bg-red-900/40 border border-red-700 rounded-lg flex items-center">
              <AlertTriangle className="text-red-500 mr-2 flex-shrink-0" size={20} />
              <p className="text-red-300 text-sm">{formError}</p>
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                {t('submit.form.serverName')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Server className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  placeholder={t('submit.form.serverNamePlaceholder')}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="icon" className="block text-sm font-medium text-gray-300 mb-1">
                {t('submit.form.serverIcon')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  placeholder={t('submit.form.serverIconPlaceholder')}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="inviteLink" className="block text-sm font-medium text-gray-300 mb-1">
                {t('submit.form.inviteLink')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="inviteLink"
                  name="inviteLink"
                  value={formData.inviteLink}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  placeholder={t('submit.form.inviteLinkPlaceholder')}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                {t('submit.form.shortDescription')} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                maxLength={150}
                rows={2}
                className="block w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                placeholder={t('submit.form.shortDescriptionPlaceholder')}
              />
            </div>
            
            <div>
              <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-300 mb-1">
                {t('submit.form.fullDescription')}
              </label>
              <textarea
                id="fullDescription"
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                rows={4}
                className="block w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                placeholder={t('submit.form.fullDescriptionPlaceholder')}
              />
            </div>
            
            <div className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={formState === 'submitting'}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                  formState === 'submitting' ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {formState === 'submitting' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                      <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('submit.form.submitting')}
                  </>
                ) : (
                  t('submit.form.submit')
                )}
              </motion.button>
            </div>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default ServerSubmitForm;