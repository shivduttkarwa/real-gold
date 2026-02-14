import { useEffect, useRef } from 'react';

export default function GoldFrame() {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation
    const frame = frameRef.current;
    if (frame) {
      frame.style.opacity = '0';
      frame.style.transform = 'scale(1.03)';
      
      setTimeout(() => {
        frame.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        frame.style.opacity = '1';
        frame.style.transform = 'scale(1)';
      }, 100);
    }
  }, []);

  return (
    <div ref={frameRef} className="gold-frame">
      <span className="gold-frame-corner-bl"></span>
      <span className="gold-frame-corner-br"></span>
    </div>
  );
}
