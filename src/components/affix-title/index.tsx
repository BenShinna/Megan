import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

export interface AffixTitleProps {
  /** 距离窗口顶部达到指定偏移量后触发, 默认 320 */
  offsetTop?: number;
  title: string;
}

const AffixTitle = (props: AffixTitleProps) => {
  const { title, offsetTop = 320 } = props;
  const affixTitleRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // 1. 外层容器：只负责定位、层级和整体的滑入/淡入动画
  const containerClasses = classNames(
    'fixed left-0 right-0 top-0 w-full transition-all duration-300 ease-in-out z-10',
    isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
  );

  // 2. 背景层：专门负责 iOS 风格的 Progressive Blur (渐进模糊)
  const blurClasses = classNames(
    'absolute inset-0 z-0 pointer-events-none',
    'backdrop-blur-md bg-slate1/80', 
    // 核心：使用 mask-image 实现从上到下的渐变消散
    '[mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_100%)]',
    '[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_40%,transparent_100%)]' 
  );

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    setIsVisible(scrollTop >= offsetTop);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={affixTitleRef} className={containerClasses}>
      
      {/* 🎨 Progressive Blur 背景层 */}
      <div className={blurClasses} />
      
      {/* 📝 实际内容层 (必须在模糊层之上，保持清晰) */}
      <div className="relative z-10 mx-auto flex items-center justify-between px-4 max-w-180">
        <button
          onClick={() => window.location.href = '/'}
          className="text-slate11 hover:text-slate12 transition-colors w-8 cursor-pointer active:scale-95 rounded-full h-6 flex items-center justify-center hover:bg-slate12/5"
        >
          ←
        </button>
        
        <div className="py-4 font-bold truncate">{title}</div>
        
        <div className="w-4" />
      </div>
      
    </div>
  );
};

export default AffixTitle;