import { useState } from 'react';
// 五行颜色映射（原从lib/astro导入，现内置）
const wuXingColors = {
  '金': { color: '#F2D97A', emoji: '🔶' },
  '木': { color: '#6BCB77', emoji: '🟢' },
  '水': { color: '#4D96FF', emoji: '🔵' },
  '火': { color: '#FF6B6B', emoji: '🔴' },
  '土': { color: '#C4B0E8', emoji: '🟣' },
  'Metal': { color: '#F2D97A', emoji: '🔶' },
  'Wood': { color: '#6BCB77', emoji: '🟢' },
  'Water': { color: '#4D96FF', emoji: '🔵' },
  'Fire': { color: '#FF6B6B', emoji: '🔴' },
  'Earth': { color: '#C4B0E8', emoji: '🟣' },
};

const palaceCNNames = [
  '命宫', '兄弟', '夫妻', '子女',
  '财帛', '疾厄', '迁移', '奴仆',
  '官禄', '田宅', '福德', '父母'
];

export default function Chart({ birthInfo, ziweiData, baziData, onNavigate }) {
  const [activeTab, setActiveTab] = useState('ziwei');
  const [selectedPalace, setSelectedPalace] = useState(null);

  if (!ziweiData && !baziData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)]">
        <div className="text-6xl mb-4">✦</div>
        <h2 className="text-xl font-serif mb-2" style={{ color: 'var(--text-primary)' }}>
          No Chart Data
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          Please enter your birth information first
        </p>
        <button
          onClick={() => onNavigate('input')}
          className="px-6 py-3 rounded-xl text-sm font-medium cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, var(--violet), var(--amethyst))',
            color: 'white',
            boxShadow: 'var(--glow-violet)',
          }}
        >
          Enter Birth Info
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'ziwei', label: 'Ziwei 紫微斗数' },
    { id: 'bazi', label: 'Ba Zi 八字四柱' },
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-serif text-2xl" style={{ color: 'var(--text-primary)' }}>
              ✦ Destiny Chart
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              {birthInfo?.name || 'Seeker'} · {birthInfo?.birthDate} · Ziwei + Ba Zi
            </p>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer border"
                style={{
                  background: activeTab === tab.id 
                    ? 'rgba(112,85,184,0.3)' 
                    : 'rgba(180,160,240,0.08)',
                  border: activeTab === tab.id 
                    ? '1px solid rgba(180,160,240,0.3)'
                    : '1px solid rgba(180,160,240,0.12)',
                  color: activeTab === tab.id ? 'var(--lavender)' : 'var(--text-secondary)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Area */}
          <div className="lg:col-span-2">
            {activeTab === 'ziwei' && (
              <ZiweiTab 
                ziweiData={ziweiData} 
                selectedPalace={selectedPalace}
                onPalaceSelect={setSelectedPalace}
              />
            )}
            {activeTab === 'bazi' && (
              <BaZiTab baziData={baziData} />
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* Selected Palace Details */}
            <PalaceDetail 
              palace={selectedPalace || ziweiData?.palaces?.[0]}
            />

            {/* Ba Zi Summary */}
            {baziData && (
              <BaZiSummary baziData={baziData} />
            )}

            {/* Four Columns */}
            {ziweiData && (
              <FourColumnsPanel ziweiData={ziweiData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Ziwei Tab Component
function ZiweiTab({ ziweiData, selectedPalace, onPalaceSelect }) {
  const palaces = ziweiData?.palaces || [];
  const lifePalace = palaces.find(p => p.name === '命宫');
  const mainStar = lifePalace?.majorStars?.[0] || 'general';
  
  return (
    <div 
      className="rounded-3xl p-8"
      style={{ 
        background: 'rgba(13,10,26,0.9)',
        border: '1px solid rgba(180,160,240,0.12)',
      }}
    >
      {/* Mandala SVG */}
      <div className="flex justify-center mb-8">
        <div className="relative w-80 h-80">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            {/* Rings */}
            <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(180,160,240,0.08)" strokeWidth="1"/>
            <circle cx="200" cy="200" r="165" fill="none" stroke="rgba(180,160,240,0.12)" strokeWidth="1" strokeDasharray="6 4"/>
            <circle cx="200" cy="200" r="135" fill="none" stroke="rgba(180,160,240,0.1)" strokeWidth="1"/>
            <circle cx="200" cy="200" r="105" fill="none" stroke="rgba(180,160,240,0.15)" strokeWidth="1" strokeDasharray="3 3"/>
            <circle cx="200" cy="200" r="70" fill="none" stroke="rgba(180,160,240,0.1)" strokeWidth="1"/>
            <circle cx="200" cy="200" r="40" fill="none" stroke="rgba(180,160,240,0.12)" strokeWidth="0.8"/>
            
            {/* Spokes */}
            <line x1="200" y1="10" x2="200" y2="390" stroke="rgba(180,160,240,0.06)" strokeWidth="0.5"/>
            <line x1="10" y1="200" x2="390" y2="200" stroke="rgba(180,160,240,0.06)" strokeWidth="0.5"/>
            <line x1="58" y1="58" x2="342" y2="342" stroke="rgba(180,160,240,0.04)" strokeWidth="0.5"/>
            <line x1="342" y1="58" x2="58" y2="342" stroke="rgba(180,160,240,0.04)" strokeWidth="0.5"/>
            
            {/* Palace dots */}
            <g opacity="0.7">
              <circle cx="200" cy="35" r="6" fill="rgba(155,132,212,0.8)"/>
              <circle cx="330" cy="70" r="5" fill="rgba(242,217,122,0.7)"/>
              <circle cx="365" cy="200" r="5.5" fill="rgba(155,132,212,0.6)"/>
              <circle cx="330" cy="330" r="5" fill="rgba(196,176,232,0.7)"/>
              <circle cx="200" cy="365" r="6" fill="rgba(242,217,122,0.5)"/>
              <circle cx="70" cy="330" r="5" fill="rgba(155,132,212,0.7)"/>
              <circle cx="35" cy="200" r="5.5" fill="rgba(196,176,232,0.6)"/>
              <circle cx="70" cy="70" r="5" fill="rgba(242,217,122,0.6)"/>
            </g>
            
            <defs>
              <linearGradient id="bigOrbit" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="rgba(155,132,212,0.8)"/>
                <stop offset="50%" stopColor="rgba(242,217,122,0.6)"/>
                <stop offset="100%" stopColor="rgba(155,132,212,0.8)"/>
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="150" fill="none" stroke="url(#bigOrbit)" strokeWidth="2" strokeDasharray="12 8" opacity="0.5"/>
          </svg>
          
          {/* Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold" style={{ 
              color: 'var(--lavender)', 
              fontFamily: 'Noto Serif SC',
              textShadow: 'var(--glow-violet)',
              lineHeight: 1,
            }}>
              72%
            </div>
            <div className="text-[11px] mt-2" style={{ color: 'var(--text-muted)', letterSpacing: '2px' }}>
              SOUL ENERGY
            </div>
            <div className="text-sm mt-2" style={{ color: 'var(--gold)' }}>
              {translateStar(mainStar)} Energy
            </div>
          </div>
        </div>
      </div>

      {/* Palace Grid */}
      <div className="grid grid-cols-4 gap-3">
        {palaces.map((palace, index) => {
          const stars = palace.majorStars || [];
          const isSelected = selectedPalace?.index === palace.index;
          
          return (
            <div
              key={index}
              onClick={() => onPalaceSelect(palace)}
              className={`p-3 rounded-xl text-center cursor-pointer transition-all ${
                isSelected ? 'border-2' : 'border'
              }`}
              style={{
                background: isSelected 
                  ? 'rgba(78,58,142,0.15)' 
                  : 'rgba(24,20,50,0.85)',
                border: isSelected 
                  ? '2px solid rgba(112,85,184,0.4)'
                  : '1px solid rgba(180,160,240,0.1)',
              }}
            >
              <div className="text-[10px] mb-1" style={{ color: 'var(--text-muted)' }}>
                {palace.name}
              </div>
              <div className="text-xs font-medium" style={{ color: 'var(--lavender)' }}>
                {stars.length > 0 ? translateStar(stars[0]) : '-'}
              </div>
              {stars.length > 1 && (
                <div className="text-[9px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                  +{stars.length - 1}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Ba Zi Tab Component
function BaZiTab({ baziData }) {
  if (!baziData?.eightCharacters) {
    return (
      <div className="p-8 text-center" style={{ color: 'var(--text-muted)' }}>
        Ba Zi data not available
      </div>
    );
  }

  const { eightCharacters, dayMaster, naYin } = baziData;
  
  const columns = [
    { key: 'year', label: 'Year年', data: eightCharacters.year },
    { key: 'month', label: 'Month月', data: eightCharacters.month },
    { key: 'day', label: 'Day日', data: eightCharacters.day },
    { key: 'hour', label: 'Hour时', data: eightCharacters.hour },
  ];

  return (
    <div 
      className="rounded-3xl p-8"
      style={{ 
        background: 'rgba(13,10,26,0.9)',
        border: '1px solid rgba(180,160,240,0.12)',
      }}
    >
      <div className="text-xs mb-6" style={{ color: 'var(--text-muted)', letterSpacing: '2px' }}>
        EIGHT CHARACTERS 四柱八字
      </div>

      {/* Ba Zi Display */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {columns.map(col => (
          <div key={col.key} className="text-center">
            <div className="text-[10px] mb-2" style={{ color: 'var(--text-muted)' }}>
              {col.label}
            </div>
            <div 
              className="py-4 rounded-xl mb-2"
              style={{ 
                background: col.key === 'day' 
                  ? 'rgba(112,85,184,0.2)' 
                  : 'rgba(36,31,66,0.6)',
                border: col.key === 'day'
                  ? '1px solid rgba(180,160,240,0.3)'
                  : '1px solid rgba(180,160,240,0.15)',
              }}
            >
              <div className="text-2xl font-bold" style={{ 
                color: 'var(--lavender)',
                fontFamily: 'Noto Serif SC',
              }}>
                {col.data.ganZhi}
              </div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                {col.data.wuXing}
              </div>
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {col.data.shiShen}
            </div>
          </div>
        ))}
      </div>

      {/* Day Master Info */}
      <div 
        className="rounded-xl p-4"
        style={{
          background: 'rgba(24,20,50,0.85)',
          border: '1px solid rgba(180,160,240,0.1)',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] mb-1" style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>
              DAY MASTER 日主
            </div>
            <div className="text-lg font-bold" style={{ color: 'var(--lavender)' }}>
              {dayMaster.name} ({dayMaster.wuXing})
            </div>
          </div>
          <div 
            className="px-4 py-2 rounded-full text-sm"
            style={{
              background: 'rgba(242,217,122,0.12)',
              border: '1px solid rgba(242,217,122,0.25)',
              color: 'var(--gold)',
            }}
          >
            {naYin}
          </div>
        </div>
      </div>
    </div>
  );
}

// Palace Detail Component
function PalaceDetail({ palace }) {
  if (!palace) return null;
  
  const stars = palace.majorStars || [];
  const mutagens = palace.mutagens || [];
  
  return (
    <div 
      className="rounded-2xl p-5"
      style={{
        background: 'rgba(24,20,50,0.85)',
        border: '1px solid rgba(180,160,240,0.1)',
      }}
    >
      <div className="text-[10px] mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>
        PALACE DETAILS
      </div>
      
      <div className="mb-3">
        <div className="text-sm font-semibold" style={{ color: 'var(--lavender)' }}>
          {palace.name}
        </div>
        <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {stars.map(s => translateStar(s)).join(' · ')}
        </div>
      </div>
      
      {mutagens.length > 0 && (
        <div className="flex gap-2 mb-3">
          {mutagens.map((m, i) => (
            <span
              key={i}
              className="px-2 py-1 rounded text-xs"
              style={{
                background: 'rgba(242,217,122,0.1)',
                border: '1px solid rgba(242,217,122,0.2)',
                color: 'var(--gold)',
              }}
            >
              {translateMutagen(m)}
            </span>
          ))}
        </div>
      )}
      
      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        {getPalaceDescription(palace.nameEN)}
      </p>
    </div>
  );
}

// Ba Zi Summary Component
function BaZiSummary({ baziData }) {
  const { eightCharacters } = baziData;
  
  // Calculate Wu Xing scores
  const wuXingCounts = {
    木: 0, 火: 0, 土: 0, 金: 0, 水: 0,
  };
  
  Object.values(eightCharacters).forEach(col => {
    const wx = col.wuXing;
    if (wuXingCounts.hasOwnProperty(wx)) {
      wuXingCounts[wx]++;
    }
  });
  
  return (
    <div 
      className="rounded-2xl p-5"
      style={{
        background: 'rgba(24,20,50,0.85)',
        border: '1px solid rgba(180,160,240,0.1)',
      }}
    >
      <div className="text-[10px] mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>
        FIVE ELEMENTS 五行
      </div>
      
      <div className="space-y-2">
        {Object.entries(wuXingCounts).map(([element, count]) => {
          const percentage = Math.round((count / 4) * 100);
          const color = wuXingColors[element]?.color || '#888';
          const emoji = wuXingColors[element]?.emoji || '⬜';
          
          return (
            <div key={element} className="flex items-center gap-2">
              <span className="text-sm">{emoji}</span>
              <span className="text-xs w-4" style={{ color: 'var(--text-secondary)' }}>
                {element}
              </span>
              <div className="flex-1 h-1.5 rounded-full overflow-hidden" 
                style={{ background: 'rgba(180,160,240,0.08)' }}>
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${percentage}%`,
                    background: color,
                  }}
                />
              </div>
              <span className="text-xs w-6 text-right" style={{ color: 'var(--text-muted)' }}>
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Four Columns Panel
function FourColumnsPanel({ ziweiData }) {
  const { fourColumns } = ziweiData;
  
  return (
    <div 
      className="rounded-2xl p-5"
      style={{
        background: 'rgba(24,20,50,0.85)',
        border: '1px solid rgba(180,160,240,0.1)',
      }}
    >
      <div className="text-[10px] mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>
        FOUR COLUMNS 四柱
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span style={{ color: 'var(--text-muted)' }}>Year年:</span>
          <span style={{ color: 'var(--lavender)' }}>{fourColumns?.year}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span style={{ color: 'var(--text-muted)' }}>Month月:</span>
          <span style={{ color: 'var(--lavender)' }}>{fourColumns?.month}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span style={{ color: 'var(--text-muted)' }}>Day日:</span>
          <span style={{ color: 'var(--lavender)' }}>{fourColumns?.day}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span style={{ color: 'var(--text-muted)' }}>Hour时:</span>
          <span style={{ color: 'var(--lavender)' }}>{fourColumns?.hour}</span>
        </div>
      </div>
    </div>
  );
}

// Helper functions
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

function translateMutagen(mutagen) {
  const map = {
    'A': '化禄',
    'B': '化权',
    'C': '化科',
    'D': '化忌',
  };
  return map[mutagen] || mutagen;
}

function getPalaceDescription(palaceName) {
  const descriptions = {
    'life': 'Represents your core personality, physical appearance, and life direction.',
    'siblings': 'Indicates relationships with siblings, friends, and your social network.',
    'spouse': 'Governs romantic relationships, marriage, and partnership.',
    'children': 'Relates to children, creativity, and your legacy.',
    'wealth': 'Controls wealth, finances, and material resources.',
    'health': 'Associated with health, illnesses, and physical well-being.',
    'migration': 'Rules travel, migration, and external opportunities.',
    'servants': 'Indicates relationships with subordinates and service-oriented interactions.',
    'career': 'Governs career, official position, and academic achievements.',
    'property': 'Relates to property, family, and ancestral inheritance.',
    'fortune': 'Controls virtue and fortune, spiritual fulfillment.',
    'parents': 'Indicates relationships with parents and mentors.',
  };
  
  return descriptions[palaceName] || 'Palace interpretation coming soon.';
}
