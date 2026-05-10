import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const BackButton = ({ label = 'Back' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gold-soft hover:text-gold transition font-semibold mb-6 hover:gap-3"
      aria-label={label}
    >
      <FaArrowLeft />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
