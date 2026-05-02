import { useState } from 'react';
import './style.css';

interface AvatarProps {
  frontSrc: string;
  backSrc: string;
  alt?: string;
  size?: number;
  onFlip?: (flipped: boolean) => void; // ✅ 新增：回调函数，方便父组件感知状态
}

export default function Avatar({ 
  frontSrc, 
  backSrc, 
  alt = '头像', 
  size = 56,
  onFlip
}: AvatarProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // ✅ 关键修复：双重保险阻止事件冒泡和默认行为
    e.preventDefault();
    e.stopPropagation();
    
    // 如果是移动端，防止快速点击触发其他事件
    if (e.nativeEvent.stopImmediatePropagation) {
      e.nativeEvent.stopImmediatePropagation();
    }
    
    const newState = !isFlipped;
    setIsFlipped(newState);
    onFlip?.(newState); // 通知父组件
  };

  return (
    <div 
      className={`avatar-flip ${isFlipped ? 'flipped' : ''}`}
      style={{ 
        width: size, 
        height: size,
        // ✅ 关键修复：确保内联样式也强制限制尺寸，防止 CSS 冲突
        minWidth: size,
        minHeight: size,
        maxWidth: size,
        maxHeight: size
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={isFlipped ? '翻回正面' : '翻转查看背面'}
      aria-pressed={isFlipped}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation(); // ✅ 键盘事件也要阻止冒泡
          const newState = !isFlipped;
          setIsFlipped(newState);
          onFlip?.(newState);
        }
      }}
      // ✅ 额外防护：捕获阶段也阻止冒泡（针对顽固的父级链接）
      onClickCapture={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="avatar-inner">
        <img 
          src={frontSrc} 
          alt={`${alt} - 正面`} 
          className="avatar-front" 
          draggable="false"
          loading="lazy" // ✅ 性能优化：懒加载
        />
        <img 
          src={backSrc} 
          alt={`${alt} - 背面`} 
          className="avatar-back" 
          draggable="false"
          loading="lazy"
        />
      </div>
    </div>
  );
}