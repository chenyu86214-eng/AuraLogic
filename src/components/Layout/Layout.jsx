import { useState, useEffect } from 'react';

export default function Layout({ children, currentPage, onNavigate }) {
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    // 生成随机星星
    const generatedStars = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 3,
      minOp: Math.random() * 0.3 + 0.1,
      maxOp: Math.random() * 0.5 + 0.5,
    }));
    setStars(generatedStars);
  }, []);

  const tabs = [
    { id: 'home', label: '🏠 Home', zhLabel: '首页' },
    { id: 'input', label: '📝 Birth Info', zhLabel: '输入' },
    { id: 'chart', label: '⭕ Chart', zhLabel: '星盘' },
  ];

  return (
    <>
      {/* Cosmic Background */}
      <div className="cosmos">
        <div className="cosmos-base" />
        <div 
          className="nebula" 
          style={{
            width: 500, height: 500,
            background: 'radial-gradient(circle,rgba(78,58,142,0.3),transparent)',
            top: -100, left: -100,
            '--dur': '25s', '--dx': '40px', '--dy': '20px',
          }}
        />
        <div 
          className="nebula" 
          style={{
            width: 400, height: 400,
            background: 'radial-gradient(circle,rgba(112,85,184,0.2),transparent)',
            bottom: 0, right: -80,
            '--dur': '30s', '--dx': '-30px', '--dy': '-40px',
          }}
        />
        <div 
          className="nebula" 
          style={{
            width: 300, height: 300,
            background: 'radial-gradient(circle,rgba(242,217,122,0.08),transparent)',
            top: '40%', left: '30%',
            '--dur': '20s', '--dx': '20px', '--dy': '-30px',
          }}
        />
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              '--dur': `${star.duration}s`,
              '--delay': `${star.delay}s`,
              '--min-op': star.minOp,
              '--max-op': star.maxOp,
            }}
          />
        ))}
      </div>

      {/* App Shell */}
      <div className="app">
        {/* Top Navigation */}
        <nav className="sticky top-0 z-50 flex items-center justify-between px-8 h-[60px]"
          style={{ background: 'rgba(13,10,26,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(180,160,240,0.1)' }}
        >
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{ 
                background: 'linear-gradient(135deg, var(--violet), var(--amethyst))',
                boxShadow: 'var(--glow-violet)',
              }}
            >
              ✦
            </div>
            <div>
              <div className="font-serif text-base font-semibold tracking-wide" style={{ color: 'var(--text-primary)' }}>
                AuraLogic
              </div>
              <div className="text-[10px]" style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>
                Eastern Wisdom · AI Insight
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div 
            className="flex gap-1 px-1 py-1 rounded-full"
            style={{ background: 'rgba(180,160,240,0.08)', border: '1px solid rgba(180,160,240,0.12)' }}
          >
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border-none cursor-pointer ${
                  currentPage === tab.id ? 'text-white' : ''
                }`}
                style={{
                  background: currentPage === tab.id 
                    ? 'linear-gradient(135deg, var(--violet), var(--amethyst))' 
                    : 'transparent',
                  color: currentPage === tab.id ? 'white' : 'var(--text-secondary)',
                  boxShadow: currentPage === tab.id ? 'var(--glow-violet)' : 'none',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <div 
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs"
              style={{ 
                background: 'rgba(112,85,184,0.2)', 
                border: '1px solid rgba(180,160,240,0.2)',
                color: 'var(--lavender)',
              }}
            >
              <div 
                className="w-1.5 h-1.5 rounded-full" 
                style={{ background: 'var(--gold)', boxShadow: '0 0 8px var(--gold)' }}
              />
              Energy
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
  );
}
