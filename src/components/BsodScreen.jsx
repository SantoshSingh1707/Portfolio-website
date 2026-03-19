import React, { useState, useEffect } from 'react';

const BsodScreen = ({ onRestart }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5);
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bsod" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: '#0078d7',
      color: 'white',
      padding: '10% 15%',
      fontFamily: '"Segoe UI", sans-serif',
      zIndex: 9999999,
      display: 'flex',
      flexDirection: 'column',
      gap: '30px'
    }}>
      <div style={{ fontSize: '120px', lineHeight: 1 }}>:(</div>
      <div style={{ fontSize: '24px', lineHeight: 1.4, maxWidth: '800px' }}>
        Your PC ran into a problem and needs to restart. We're just collecting some error info, 
        and then we'll restart for you.
      </div>
      <div style={{ fontSize: '24px' }}>
        {percent}% complete
      </div>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '20px' }}>
        <img 
          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://github.com/SantoshSingh1707" 
          alt="QR Code" 
          style={{ width: '100px', height: '100px', background: 'white', padding: '5px' }}
        />
        <div style={{ fontSize: '14px', opacity: 0.8 }}>
          <p>For more information about this issue and possible fixes, visit https://windows.com/stopcode</p>
          <p style={{ marginTop: '10px' }}>If you call a support person, give them this info:</p>
          <p>Stop code: CRITICAL_PROCESS_DIED_BY_SANTOSH</p>
        </div>
      </div>

      {percent === 100 && (
        <button 
          onClick={onRestart}
          style={{
            alignSelf: 'flex-start',
            padding: '10px 20px',
            background: 'white',
            color: '#0078d7',
            border: 'none',
            borderRadius: '4px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Restart Now
        </button>
      )}

      <style>{`
        .bsod {
          animation: bsodAppear 0.3s ease-out;
        }
        @keyframes bsodAppear {
          from { opacity: 0; transform: scale(1.1); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default BsodScreen;
