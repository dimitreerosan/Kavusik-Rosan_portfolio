import React, { useState, useEffect } from 'react';

export default function WelcomeScreen() {
  const [displayedText, setDisplayedText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const fullText = "WELCOME";

  useEffect(() => {
    // Prevent scrolling while welcome screen is active
    document.body.style.overflow = 'hidden';

    // Ensure we start scrolled to top
    window.scrollTo(0, 0);

    // Typing effect (uses slice to prevent duplication from double-rendering/strict-mode)
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 120); // 120ms per letter (approx. 0.84s total typing)

    // Fade out trigger after 10.0 seconds
    const fadeTimeout = setTimeout(() => {
      setIsFading(true);
    }, 10000);

    // Unmount trigger after 10.8 seconds (allows 800ms fade transition)
    const unmountTimeout = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = '';
    }, 10800);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(fadeTimeout);
      clearTimeout(unmountTimeout);
      document.body.style.overflow = '';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes smooth-blink {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 1; }
        }
        .cursor-smooth-blink {
          animation: smooth-blink 1.2s ease-in-out infinite;
        }
      `}} />
      <div
        className={`fixed inset-0 z-[9999] bg-[#000000] select-none transition-opacity duration-800 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
      >
        <div
          className="absolute bottom-[20%] left-[12%] flex items-center select-none leading-none"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          <span
            className="text-[1.1rem] sm:text-[1.25rem] md:text-[1.4rem] font-bold tracking-[0.15em]"
            style={{ color: '#CC0000' }}
          >
            {displayedText}
          </span>
          <span
            className="w-[0.55em] h-[0.55em] ml-2 cursor-smooth-blink"
            style={{
              backgroundColor: '#CC0000',
              display: 'inline-block',
              alignSelf: 'center',
              marginTop: '-0.05em'
            }}
          />
        </div>
      </div>
    </>
  );
}
