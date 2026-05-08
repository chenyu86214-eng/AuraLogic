import { useState, useEffect } from 'react';
import Lunar from 'lunar-javascript';

export default function DailyFortune({ ziweiData, birthInfo }) {
  const [fortune, setFortune] = useState({
    career: 65,
    love: 75,
    wealth: 60,
    health: 80,
    interpersonal: 70,
  });

  const [todayInfo, setTodayInfo] = useState({
    date: '',
    lunarDate: '',
    theme: '',
    quote: '',
  });

  useEffect(() => {
    // 计算今日运势
    const now = new Date();
    setTodayInfo({
      date: now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      lunarDate: getLunarDateString(),
      theme: getTodayTheme(),
      quote: getTodayQuote(),
    });

    // 基于八字五行计算运势
    if (ziweiData?.lunarInfo) {
      const scores = calculateFortuneFromBazi();
      setFortune(scores);
    }
  }, [ziweiData]);

  const getLunarDateString = () => {
    const now = new Date();
    const lunar = Lunar.Solar.fromYmd(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
    ).getLunar();
    
    return `${lunar.getYearInChinese()}年 · ${lunar.getMonthInChinese()}${lunar.getDayInChinese()}`;
  };

  const getTodayTheme = () => {
    const themes = [
      'Letting Go 放下执着',
      'Inner Peace 内心平静',
      'New Beginnings 新的开始',
      'Self Reflection 自我反思',
      'Growth 成长与突破',
      'Balance 平衡与和谐',
    ];
    return themes[new Date().getDay()];
  };

  const getTodayQuote = () => {
    const quotes = [
      '"Sometimes the most powerful thing you can do is simply nothing."',
      '"Trust the timing of your life."',
      '"Healing is not forgetting, but integrating."',
      '"The universe conspires in favor of those who follow their heart."',
    ];
    return quotes[new Date().getDate() % quotes.length];
  };

  const calculateFortuneFromBazi = () => {
    // 基于日干五行简单计算
    const dayElement = ziweiData?.lunarInfo?.eightCharacters?.day?.[0] || '木';
    
    // 根据五行旺衰微调运势
    const baseScores = {
      木: { career: 70, love: 75, wealth: 60, health: 65, interpersonal: 80 },
      火: { career: 75, love: 70, wealth: 65, health: 70, interpersonal: 75 },
      土: { career: 65, love: 80, wealth: 70, health: 75, interpersonal: 70 },
      金: { career: 80, love: 65, wealth: 75, health: 60, interpersonal: 70 },
      水: { career: 70, love: 70, wealth: 65, health: 80, interpersonal: 75 },
    };
    
    return baseScores[dayElement] || baseScores['木'];
  };

  const fortuneItems = [
    { key: 'career', label: 'Career', zhLabel: '事业', emoji: '💼', color: 'var(--amethyst)' },
    { key: 'love', label: 'Love', zhLabel: '感情', emoji: '💕', color: '#8E4A8E' },
    { key: 'wealth', label: 'Wealth', zhLabel: '财运', emoji: '💰', color: 'var(--amber)' },
    { key: 'health', label: 'Health', zhLabel: '健康', emoji: '🌿', color: '#3A6E5A' },
    { key: 'interpersonal', label: 'Social', zhLabel: '人际', emoji: '🤝', color: 'var(--violet)' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div 
        className="rounded-2xl p-5"
        style={{ 
          background: 'rgba(19,16,43,0.8)',
          border: '1px solid rgba(180,160,240,0.12)',
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs" style={{ color: 'var(--text-secondary)', letterSpacing: '1px' }}>
            TODAY'S FORTUNE
          </div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {todayInfo.date}
          </div>
        </div>
        
        <div className="space-y-3">
          {fortuneItems.map((item, index) => (
            <div key={item.key} className="flex items-center gap-3">
              <div className="w-5 text-center">{item.emoji}</div>
              <div className="text-xs w-10" style={{ color: 'var(--text-secondary)' }}>
                {item.zhLabel}
              </div>
              <div className="flex-1 h-1 rounded-full overflow-hidden" 
                style={{ background: 'rgba(180,160,240,0.08)' }}>
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${fortune[item.key]}%`,
                    background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)`,
                    animation: `bar-load 1.5s ease forwards`,
                    animationDelay: `${index * 0.15}s`,
                  }}
                />
              </div>
              <div className="text-xs w-6 text-right" style={{ color: 'var(--text-muted)' }}>
                {fortune[item.key]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Card */}
      <div 
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(145deg, rgba(78,58,142,0.25), rgba(19,16,43,0.8))',
          border: '1px solid rgba(180,160,240,0.15)',
        }}
      >
        <div 
          className="absolute right-5 bottom-4 text-8xl opacity-[0.04]"
          style={{ lineHeight: 1 }}
        >
          ✦
        </div>
        
        <div className="text-[10px] mb-3" style={{ color: 'var(--text-muted)', letterSpacing: '2px' }}>
          TODAY'S MESSAGE
        </div>
        
        <div 
          className="text-base leading-relaxed mb-3 italic"
          style={{ 
            fontFamily: 'Noto Serif SC',
            color: 'var(--text-primary)' 
          }}
        >
          {todayInfo.quote}
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <div 
            className="px-3 py-1 rounded-full text-xs"
            style={{
              background: 'rgba(242,217,122,0.12)',
              border: '1px solid rgba(242,217,122,0.25)',
              color: 'var(--gold)',
            }}
          >
            ✦ {todayInfo.theme}
          </div>
        </div>
        
        <div className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {todayInfo.lunarDate} · Your destiny is unfolding in perfect timing.
        </div>
      </div>
    </div>
  );
}
