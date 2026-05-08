import { useEffect, useState } from 'react';

export default function AstroChart({ ziweiData, baziData, onPalaceClick }) {
  const [palaceNames, setPalaceNames] = useState([
    '命宫', '兄弟', '夫妻', '子女',
    '财帛', '疾厄', '迁移', '奴仆',
    '官禄', '田宅', '福德', '父母'
  ]);

  if (!ziweiData) {
    return (
      <div 
        className="rounded-3xl p-8 flex flex-col items-center justify-center"
        style={{ 
          background: 'rgba(19,16,43,0.8)',
          border: '1px solid rgba(180,160,240,0.12)',
          minHeight: '400px',
        }}
      >
        <div className="text-6xl mb-4" style={{ color: 'var(--text-ghost)' }}>✦</div>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Enter your birth info to generate chart
        </p>
      </div>
    );
  }

  const palaces = ziweiData?.palaces || [];
  const lifePalace = palaces.find(p => p.name === '命宫');
  const mingGongStars = lifePalace?.majorStars || [];

  // 计算能量分数（基于命宫星耀）
  const energyScore = calculateEnergyScore(mingGongStars);

  return (
    <div className="space-y-6">
      {/* Mandala Visualization */}
      <div 
        className="rounded-3xl p-8 flex flex-col items-center"
        style={{ 
          background: 'rgba(19,16,43,0.8)',
          border: '1px solid rgba(180,160,240,0.12)',
        }}
      >
        <div className="text-xs mb-4" style={{ color: 'var(--text-muted)', letterSpacing: '2px' }}>
          DESTINY MANDALA
        </div>
        
        {/* SVG Mandala */}
        <div className="relative w-64 h-64">
          <svg viewBox="0 0 256 256" className="w-full h-full" style={{ animation: 'mandala-spin 90s linear infinite' }}>
            {/* Outer rings */}
            <circle cx="128" cy="128" r="120" fill="none" stroke="rgba(180,160,240,0.08)" strokeWidth="1"/>
            <circle cx="128" cy="128" r="100" fill="none" stroke="rgba(180,160,240,0.12)" strokeWidth="1" strokeDasharray="6 4"/>
            <circle cx="128" cy="128" r="80" fill="none" stroke="rgba(180,160,240,0.1)" strokeWidth="1"/>
            <circle cx="128" cy="128" r="60" fill="none" stroke="rgba(180,160,240,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
            <circle cx="128" cy="128" r="40" fill="none" stroke="rgba(180,160,240,0.1)" strokeWidth="1"/>
            <circle cx="128" cy="128" r="20" fill="none" stroke="rgba(180,160,240,0.12)" strokeWidth="0.8"/>
            
            {/* Spokes */}
            <line x1="128" y1="8" x2="128" y2="248" stroke="rgba(180,160,240,0.06)" strokeWidth="0.5"/>
            <line x1="8" y1="128" x2="248" y2="128" stroke="rgba(180,160,240,0.06)" strokeWidth="0.5"/>
            <line x1="40" y1="40" x2="216" y2="216" stroke="rgba(180,160,240,0.04)" strokeWidth="0.5"/>
            <line x1="216" y1="40" x2="40" y2="216" stroke="rgba(180,160,240,0.04)" strokeWidth="0.5"/>
            
            {/* Palace markers */}
            <g opacity="0.7">
              <circle cx="128" cy="20" r="4" fill="rgba(155,132,212,0.8)"/>
              <circle cx="210" cy="46" r="3" fill="rgba(242,217,122,0.7)"/>
              <circle cx="236" cy="128" r="3.5" fill="rgba(155,132,212,0.6)"/>
              <circle cx="210" cy="210" r="3" fill="rgba(196,176,232,0.7)"/>
              <circle cx="128" cy="236" r="4" fill="rgba(242,217,122,0.5)"/>
              <circle cx="46" cy="210" r="3" fill="rgba(155,132,212,0.7)"/>
              <circle cx="20" cy="128" r="3.5" fill="rgba(196,176,232,0.6)"/>
              <circle cx="46" cy="46" r="3" fill="rgba(242,217,122,0.6)"/>
            </g>
            
            {/* Glowing orbit */}
            <defs>
              <linearGradient id="orbitGrad" x1="0" y1="0" x2="256" y2="256" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(155,132,212,0.8)"/>
                <stop offset="50%" stopColor="rgba(242,217,122,0.6)"/>
                <stop offset="100%" stopColor="rgba(155,132,212,0.8)"/>
              </linearGradient>
            </defs>
            <circle cx="128" cy="128" r="90" fill="none" stroke="url(#orbitGrad)" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6"/>
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold" style={{ 
              color: 'var(--lavender)', 
              fontFamily: 'Noto Serif SC',
              textShadow: 'var(--glow-violet)'
            }}>
              {energyScore}%
            </div>
            <div className="text-[10px] mt-1" style={{ color: 'var(--text-muted)', letterSpacing: '2px' }}>
              SOUL ENERGY
            </div>
            <div className="text-xs mt-2" style={{ color: 'var(--gold)' }}>
              {mingGongStars[0] ? translateStar(mingGongStars[0]) : '天机'} Energy
            </div>
          </div>
        </div>

        {/* Palace Grid */}
        <div className="w-full grid grid-cols-4 gap-2 mt-4">
          {palaces.slice(0, 8).map((palace, index) => {
            const mainStar = palace.majorStars?.[0] || '-';
            
            return (
              <div
                key={index}
                onClick={() => onPalaceClick?.(palace)}
                className="py-2 px-1 text-center rounded-lg cursor-pointer transition-all hover:scale-105"
                style={{
                  background: 'rgba(180,160,240,0.08)',
                  border: '1px solid rgba(180,160,240,0.1)',
                }}
              >
                <div className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{palace.name}</div>
                <div className="text-[11px] font-medium mt-0.5" style={{ color: 'var(--lavender)' }}>
                  {mainStar !== '-' ? translateStar(mainStar) : '-'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Stars Display */}
      <div 
        className="rounded-2xl p-5"
        style={{ 
          background: 'rgba(24,20,50,0.85)',
          border: '1px solid rgba(180,160,240,0.1)',
        }}
      >
        <div className="text-xs mb-4" style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>
          MAIN STARS IN MING GONG
        </div>
        <div className="flex flex-wrap gap-2">
          {mingGongStars.map((star, index) => (
            <span
              key={index}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: 'rgba(112,85,184,0.2)',
                border: '1px solid rgba(180,160,240,0.2)',
                color: 'var(--lavender)',
              }}
            >
              {translateStar(star)}
            </span>
          ))}
          {mingGongStars.length === 0 && (
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Empty Palace
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function calculateEnergyScore(stars) {
  // 基础分数
  let score = 60;
  
  // 旺星加分
  const goodStars = ['general', 'tianfu', 'minister', 'tiantong', 'tianliang', 'tianji', 'moon', 'sun'];
  const neutralStars = ['wuqu', 'lianzhen', 'tanlang', 'jumen'];
  
  stars.forEach(star => {
    if (goodStars.includes(star)) score += 8;
    else if (neutralStars.includes(star)) score += 3;
  });
  
  return Math.min(100, Math.max(30, score));
}

function translateStar(star) {
  const map = {
    'general': '紫微',
    'minister': '天相',
    'sun': '太阳',
    'moon': '太阴',
    'tianji': '天机',
    'wuqu': '武曲',
    'tiantong': '天同',
    'lianzhen': '廉贞',
    'tianfu': '天府',
    'tanlang': '贪狼',
    'jumen': '巨门',
    'tianliang': '天梁',
    'qisha': '七杀',
    'pojun': '破军',
  };
  return map[star] || star;
}
