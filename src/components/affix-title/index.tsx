import React from 'react';

const BlurredBlogPost = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white min-h-screen shadow-xl overflow-hidden font-sans">
      
      {/* 1. 顶部导航栏 (清晰区域) */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          ←
        </button>
        <h1 className="text-lg font-semibold text-gray-800">
          博客的几个小更新
        </h1>
        <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center text-xs text-gray-400">
          17
        </div>
      </header>

      {/* 2. 内容区域 (模糊区域) */}
      {/* 
          关键点解析：
          - blur-md: 应用中等程度的高斯模糊 (Tailwind 默认约 12px)
          - opacity-40: 降低不透明度，让文字看起来像灰色的影子
          - select-none: 禁止选中文字
          - pointer-events-none: 禁止点击（防止用户点击模糊后的链接）
      */}
      <div className="p-6 space-y-4 filter blur-md opacity-40 select-none pointer-events-none transition-all duration-500">
        
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        
        <p className="text-gray-800 leading-relaxed">
          这里是原本应该显示的文章正文内容。因为添加了 filter: blur()，
          所以现在的文字变得模糊不清，就像你提供的图片里那样。
          这种效果通常用来隐藏剧透，或者提示用户需要登录/付费才能查看。
        </p>

        <p className="text-gray-800 leading-relaxed">
          《完美的日子》里反复出现的一个词...
        </p>
        
        <div className="h-32 bg-gray-100 rounded-lg w-full mt-4"></div>
      </div>

      {/* 可选：底部提示 (清晰区域，提示用户为什么模糊) */}
      <div className="absolute bottom-10 left-0 right-0 text-center z-30">
        <button className="bg-black text-white px-6 py-2 rounded-full shadow-lg hover:bg-gray-800 transition-colors text-sm font-medium">
          点击解锁全文
        </button>
      </div>

    </div>
  );
};

export default BlurredBlogPost;