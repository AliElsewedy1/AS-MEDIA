import React, { useEffect, useState } from 'react';

export const AmbientBackground: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (currentScroll > 100) {
        setIsVisible(true);
        if (docHeight > 0) {
          setScrollProgress(currentScroll / docHeight);
        }
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="ambient-bubbles-wrapper" aria-hidden="true">
        <div className="ambient-bubble bubble-1"></div>
        <div className="ambient-bubble bubble-2"></div>
        <div className="ambient-bubble bubble-3"></div>
      </div>

      <div className={`tracing-beam-line ${isVisible ? 'visible' : ''}`} id="tracingBeamLine" aria-hidden="true">
        <div
          className="tracing-beam-thumb"
          style={{
            transform: `translate3d(0, ${scrollProgress * (window.innerHeight - 90)}px, 0)`,
          }}
        ></div>
      </div>
    </>
  );
};
