import { useState, useEffect } from 'react';
import AstroChart from '../components/AstroChart/AstroChart';
import DailyFortune from '../components/DailyFortune/DailyFortune';

export default function Home({ birthInfo, ziweiData, baziData, onNavigate }) {
  const [energyScore, setEnergyScore] = useState(72);
  const [todayTheme, setTodayTheme] = useState('Letting Go 放下执着');

  useEffect(() => {
    if (ziweiData?.palaces) {
      const lifePalace = ziweiData.palaces.find(p => p.name === '命宫');
      const stars = lifePalace?.majorStars || [];
      
      // 计算能量分数
      let score = 60;
      const goodStars = ['general', 'tianfu', 'minister', 'tiantong', 'tianliang', 'tianji', 'moon', 'sun'];
      stars.forEach(star => {
        if (goodStars.includes(star)) score += 5;
      });
      setEnergyScore(Math.min(100, Math.max(30, score)));
    }
  }, [ziweiData]);

  const quickLinks = [
    {
      icon: '⭕',
      name: 'Destiny Chart',
      hint: '本命星盘 · Ziwei',
      bg: 'linear-gradient(135deg,rgba(155,132,212,0.2),rgba(78,58,142,0.15))',
      border: 'rgba(180,160,240,0.15)',
      page: 'chart',
    },
    {
      icon: '✨',
      name: 'AI Interpretation',
      hint: '深度命盘分析',
      bg: 'linear-gradient(135deg,rgba(78,58,142,0.3),rgba(36,31,66,0.2))',
      border: 'rgba(180,160,240,0.15)',
      page: 'chart',
    },
    {
      icon: '☰',
      name: 'Ba Zi Analysis',
      hint: '八字四柱 · Eight Characters',
      bg: 'linear-gradient(135deg,rgba(242,217,122,0.15),rgba(78,58,142,0.1))',
      border: 'rgba(242,217,122,0.2)',
      page: 'chart',
    },
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Greeting Section */}
        <div 
          className="rounded-3xl p-8 mb-6 relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(145deg, rgba(36,31,66,0.9), rgba(28,24,56,0.8))',
            border: '1px solid rgba(180,160,240,0.15)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Decorative glow */}
          <div 
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(112,85,184,0.4), transparent 70%)' }}
          />
          
          <div className="relative z-10">
            <div className="text-xs mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '2px' }}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            
            <h1 className="font-serif text-3xl font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {birthInfo?.name ? `Hello, ${birthInfo.name} ✦` : 'Hello, Seeker ✦'}
            </h1>
            
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              {birthInfo?.birthDate 
                ? 'Your destiny chart is resonating with the cosmos'
                : 'Enter your birth info to discover your destiny'}
            </p>

            {/* Energy Meter */}
            <div className="mb-4">
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-[11px]" style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>
                  TODAY'S ENERGY
                </span>
                <span>
                  <span className="text-4xl font-bold" style={{ 
                    color: 'var(--lavender)', 
                    fontFamily: 'Noto Serif SC',
                    lineHeight: 1
                  }}>
                    {energyScore}
                  </span>
                  <span className="text-sm ml-0.5" style={{ color: 'var(--text-secondary)' }}>%</span>
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden mb-3" 
                style={{ background: 'rgba(180,160,240,0.1)' }}>
                <div 
                  className="h-full rounded-full"
                  style={{
                    width: `${energyScore}%`,
                    background: 'linear-gradient(90deg, var(--amethyst), var(--lilac), var(--lavender))',
                    boxShadow: '0 0 12px rgba(155,132,212,0.6)',
                    animation: 'bar-load 1.2s cubic-bezier(0.4,0,0.2,1) forwards',
                  }}
                />
              </div>
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                style={{
                  background: 'rgba(242,217,122,0.12)',
                  border: '1px solid rgba(242,217,122,0.25)',
                  color: 'var(--gold)',
                }}
              >
                ✦ Theme: {todayTheme}
              </div>
            </div>

            {!birthInfo?.birthDate && (
              <button
                onClick={() => onNavigate('input')}
                className="w-full py-3 rounded-xl text-sm font-medium transition-all cursor-pointer mt-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(112,85,184,0.3), rgba(78,58,142,0.2))',
                  border: '1px solid rgba(180,160,240,0.25)',
                  color: 'var(--lavender)',
                }}
              >
                ☽ Enter Birth Info to Get Started
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Quick Links */}
          <div className="space-y-4">
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <div
                  key={index}
                  onClick={() => onNavigate(link.page)}
                  className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all hover:translate-x-2"
                  style={{
                    background: link.bg,
                    border: `1px solid ${link.border}`,
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{ background: 'rgba(28,24,56,0.5)' }}
                  >
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {link.name}
                    </div>
                    <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      {link.hint}
                    </div>
                  </div>
                  <div style={{ color: 'var(--text-ghost)' }}>›</div>
                </div>
              ))}
            </div>

            {/* Personality Insight */}
            <div 
              className="rounded-2xl p-5 cursor-pointer transition-all"
              style={{
                background: 'rgba(24,20,50,0.8)',
                border: '1px solid rgba(180,160,240,0.12)',
              }}
              onClick={() => onNavigate('chart')}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,rgba(112,85,184,0.3),rgba(78,58,142,0.2))' }}
                >
                  🌙
                </div>
                <div>
                  <div className="text-[10px] mb-1" style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>
                    PERSONALITY
                  </div>
                  <div className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    {ziweiData?.palaces 
                      ? getPersonalityDescription(ziweiData)
                      : 'Your personality traits will appear here based on your Ziwei chart.'
                    }
                  </div>
                  <div className="text-xs mt-2" style={{ color: 'var(--lilac)' }}>
                    View Details →
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Chart */}
          <div className="lg:col-span-1">
            <AstroChart 
              ziweiData={ziweiData} 
              baziData={baziData}
              onPalaceClick={(palace) => console.log('Palace clicked:', palace)}
            />
          </div>

          {/* Right Column - Daily Fortune */}
          <div className="lg:col-span-1">
            <DailyFortune ziweiData={ziweiData} birthInfo={birthInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}

function getPersonalityDescription(ziweiData) {
  const lifePalace = ziweiData.palaces?.find(p => p.name === '命宫');
  const stars = lifePalace?.majorStars || [];
  
  if (stars.length === 0) {
    return 'You possess a unique spiritual energy. Your empty palace indicates a soul that is free from conventional constraints, seeking liberation and personal growth.';
  }
  
  const descriptions = {
    'tianji': 'You have a keen analytical mind with natural wisdom. You excel at strategic thinking and enjoy helping others through your insights.',
    'general': 'You carry an imperial presence with strong leadership qualities. Your destiny is to influence and inspire those around you.',
    'tiantong': 'You are blessed with a harmonious and content nature. Finding joy in life\'s simple pleasures comes naturally to you.',
    'wuqu': 'You possess unwavering determination and financial acumen. Your persistence leads to material success.',
    'sun': 'You shine with optimism and generosity. Your warmth illuminates the lives of those around you.',
  };
  
  const mainStar = stars[0];
  for (const [star, desc] of Object.entries(descriptions)) {
    if (mainStar === star) return desc;
  }
  
  return 'Your chart reveals a complex and multifaceted personality, ready to be explored and understood.';
}
