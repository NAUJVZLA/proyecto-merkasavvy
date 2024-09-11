// components/ModernLoadingSpinner.tsx
import React from "react";

const ModernLoadingSpinner: React.FC = () => {
  return (
    <div className="loading-spinner">
      <div className="dot dot1"></div>
      <div className="dot dot2"></div>
      <div className="dot dot3"></div>
      <style jsx>{`
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #3498db;
          margin: 0 5px;
          animation: bounce 0.6s infinite alternate;
        }
        .dot1 {
          animation-delay: 0s;
        }
        .dot2 {
          animation-delay: 0.2s;
        }
        .dot3 {
          animation-delay: 0.4s;
        }
        @keyframes bounce {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};

export default ModernLoadingSpinner;
