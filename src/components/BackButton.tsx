import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back
    </button>
  );
};

export default BackButton;
