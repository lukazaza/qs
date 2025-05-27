import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800">
        <Globe size={20} className="mr-2" />
        <span className="capitalize">{i18n.language}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-lg shadow-xl invisible group-hover:visible">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700"
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;