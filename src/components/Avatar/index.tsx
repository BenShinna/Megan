import { useState } from 'react';
import './style.css';

interface AvatarProps {
  frontSrc: string;
  backSrc: string;
  alt?: string;
  size?: number;
}

export default function Avatar({ 
  frontSrc, 
  backSrc, 
  alt = '头像', 
  size = 56 
}: AvatarProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`avatar-flip ${isFlipped ? 'flipped' : ''}`}
      style={{ width: size, height: size }}
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      aria-label="切换头像"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div className="avatar-inner">
        <img src={frontSrc} alt={alt} className="avatar-front" draggable="false" />
        <img src={backSrc} alt={alt} className="avatar-back" draggable="false" />
      </div>
    </div>
  );
}
