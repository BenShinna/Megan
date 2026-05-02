import { useState, useCallback } from 'react';
import './style.css';

interface AvatarProps {
  frontSrc: string;
  backSrc: string;
  alt?: string;
  size?: number;
  onFlip?: (flipped: boolean) => void;
  stopPropagationRadius?: number; // ✅ 新增：防护半径（像素），默认 20
}

export default function Avatar({ 
  frontSrc, 
  backSrc, 
  alt = '头像', 
  size = 56,
  onFlip,
  stopPropagationRadius = 20 // 默认防护头像外 20px 区域
}: AvatarProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // ✅ 核心：统一事件处理 + 智能区域判断
  const handleInteraction = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    
    // ✅ 额外防护：如果是鼠标/触摸事件，检查点击位置
    if ('clientX' in e.nativeEvent) {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const clickX = (e.nativeEvent as MouseEvent).clientX;
      const clickY = (e.nativeEvent as MouseEvent).clientY;
      
      // 计算点击位置距离头像中心的距离
      const distance = Math.sqrt(
        Math.pow(clickX - centerX, 2) + 
        Math.pow(clickY - centerY, 2)
      );
      
      // ✅ 如果点击在"防护半径"内，强制阻止跳转
      const maxDistance = Math.min(rect.width, rect.height) / 2 + stopPropagationRadius;
      if (distance <= maxDistance) {
        console.log('🛡️ 防护区域点击已拦截', { distance, maxDistance });
      }
    }
        const newState = !isFlipped;
    setIsFlipped(newState);
    onFlip?.(newState);
  }, [isFlipped, onFlip, stopPropagationRadius]);

  return (
    <>
      {/* ✅ 新增：透明防护罩（覆盖头像+周围区域）*/}
      <span
        className="avatar-shield"
        style={{
          position: 'absolute',
          width: size + stopPropagationRadius * 2,
          height: size + stopPropagationRadius * 2,
          top: -stopPropagationRadius,
          left: -stopPropagationRadius,
          borderRadius: '50%',
          background: 'transparent',
          zIndex: 1,
          cursor: 'pointer'
        }}
        // ✅ 防护罩也绑定事件拦截
        onClickCapture={handleInteraction}
        onMouseDownCapture={handleInteraction}
        onTouchStartCapture={handleInteraction}
        onPointerDownCapture={handleInteraction}
        aria-hidden="true" // 对屏幕阅读器隐藏
      />
      
      {/* 头像主体 - 相对定位，确保防护罩能正确覆盖 */}
      <div 
        className={`avatar-flip ${isFlipped ? 'flipped' : ''}`}
        style={{ 
          position: 'relative', // ✅ 关键：为防护罩提供定位基准
          width: size, 
          height: size,
          minWidth: size,
          minHeight: size,
          maxWidth: size,
          maxHeight: size,
          display: 'inline-block',
          cursor: 'pointer',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
          zIndex: 2 // ✅ 确保头像在防护罩上方（视觉层）
        }}
        onClick={handleInteraction}
        onMouseDown={handleInteraction}
        onTouchStart={handleInteraction}
        onPointerDown={handleInteraction}        role="button"
        tabIndex={0}
        aria-label={isFlipped ? '翻回正面' : '翻转查看背面'}
        aria-pressed={isFlipped}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleInteraction(e);
          }
        }}
      >
        <div className="avatar-inner">
          <img 
            src={frontSrc} 
            alt={`${alt} - 正面`} 
            className="avatar-front" 
            draggable="false"
            loading="lazy"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
          <img 
            src={backSrc} 
            alt={`${alt} - 背面`} 
            className="avatar-back" 
            draggable="false"
            loading="lazy"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </>
  );
}