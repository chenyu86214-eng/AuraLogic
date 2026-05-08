import Lunar from 'lunar-javascript';

/**
 * 八字四柱排盘
 */
export function getBaZiChart(birthDate, birthTime, isSolar = true) {
  try {
    const [year, month, day] = birthDate.split('-').map(Number);
    
    // 转换为农历
    const lunarDate = isSolar 
      ? Lunar.Solar.fromYmd(year, month, day).getLunar()
      : Lunar.Lunar.fromYmd(year, month, day);
    
    // 获取八字
    const bazi = lunarDate.getBaZi();
    const baziWuXing = lunarDate.getBaZiWuXing();
    const naYin = lunarDate.getNaYin();
    
    // 获取十神
    const shiShen = getShiShen(bazi, baziWuXing);
    
    // 获取大运
    const daYun = lunarDate.getDaYun();
    
    // 获取藏干
    const cangGan = lunarDate.getBaZiZhuShou();
    
    // 流年
    const currentYear = new Date().getFullYear();
    const liuNian = getLiuNian(lunarDate, currentYear);
    
    return {
      success: true,
      eightCharacters: {
        year: {
          ganZhi: bazi[0],
          wuXing: baziWuXing[0],
          shiShen: shiShen.year,
          cangGan: cangGan[0],
        },
        month: {
          ganZhi: bazi[1],
          wuXing: baziWuXing[1],
          shiShen: shiShen.month,
          cangGan: cangGan[1],
        },
        day: {
          ganZhi: bazi[2],
          wuXing: baziWuXing[2],
          shiShen: shiShen.day,
          cangGan: cangGan[2],
        },
        hour: {
          ganZhi: bazi[3],
          wuXing: baziWuXing[3],
          shiShen: shiShen.hour,
          cangGan: cangGan[3],
        },
      },
      naYin,
      dayMaster: {
        name: bazi[2][0], // 日干
        wuXing: baziWuXing[2],
      },
      daYun: daYun.slice(0, 10).map(d => ({
        startAge: d.getStartAge(),
        startYear: d.getStartYear(),
        ganZhi: d.getGanZhi(),
        wuXing: d.getWuXing(),
      })),
      liuNian,
      lunarInfo: {
        lunarYear: lunarDate.getYearInChinese(),
        lunarMonth: lunarDate.getMonthInChinese(),
        lunarDay: lunarDate.getDayInChinese(),
        zodiac: lunarDate.getShengXiao(),
        solarTerms: lunarDate.getSolarTerms()?.getName() || '',
      },
    };
  } catch (error) {
    console.error('八字排盘失败:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 计算十神
 */
function getShiShen(bazi, baziWuXing) {
  const dayGan = bazi[2][0]; // 日干
  const dayWuXing = baziWuXing[2]; // 日干五行
  
  const wuXingMap = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水',
  };
  
  const dayElement = wuXingMap[dayGan];
  
  // 同我者为比劫，我生者为食伤，生我者为印枭，我克者为财，克我者为官杀
  const relations = ['比劫', '食伤', '印枭', '财', '官杀'];
  const wuXingOrder = ['木', '火', '土', '金', '水'];
  
  const dayIndex = wuXingOrder.indexOf(dayElement);
  
  return {
    year: getRelationShiShen(baziWuXing[0], dayElement, dayIndex, wuXingOrder),
    month: getRelationShiShen(baziWuXing[1], dayElement, dayIndex, wuXingOrder),
    day: '日主',
    hour: getRelationShiShen(baziWuXing[3], dayElement, dayIndex, wuXingOrder),
  };
}

function getRelationShiShen(targetWuXing, dayElement, dayIndex, wuXingOrder) {
  if (targetWuXing === dayElement) return '比肩';
  
  const targetIndex = wuXingOrder.indexOf(targetWuXing);
  const diff = (targetIndex - dayIndex + 5) % 5;
  
  // 同我=0, 生我=1, 我生=2, 我克=3, 克我=4
  const relations = ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印'];
  
  return relations[(diff * 2) % 10];
}

/**
 * 获取流年信息
 */
function getLiuNian(lunarDate, year) {
  const liuNian = [];
  
  for (let i = -5; i <= 5; i++) {
    const y = year + i;
    const solar = Lunar.Lunar.fromYmd(
      lunarDate.getYear(),
      lunarDate.getMonth(),
      lunarDate.getDay()
    ).getSolar();
    
    // 这里简化处理，实际需要考虑闰月等因素
    const yearGanZhi = getYearGanZhi(y);
    const yearWuXing = getWuXingFromGanZhi(yearGanZhi);
    
    liuNian.push({
      year: y,
      ganZhi: yearGanZhi,
      wuXing: yearWuXing,
      isCurrent: i === 0,
    });
  }
  
  return liuNian;
}

function getYearGanZhi(year) {
  const baseYear = 1984; // 甲子年
  const gan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const zhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  
  const offset = year - baseYear;
  const ganIndex = ((offset % 10) + 10) % 10;
  const zhiIndex = ((offset % 12) + 12) % 12;
  
  return gan[ganIndex] + zhi[zhiIndex];
}

function getWuXingFromGanZhi(ganZhi) {
  const map = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
    '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
  };
  return map[ganZhi[0]] || '';
}

/**
 * 计算五行分数
 */
export function calculateWuXingScore(baziWuXing) {
  const wuXingCount = {
    '木': 0, '火': 0, '土': 0, '金': 0, '水': 0,
  };
  
  Object.values(baziWuXing).forEach(wx => {
    if (wuXingCount.hasOwnProperty(wx)) {
      wuXingCount[wx]++;
    }
  });
  
  // 计算百分比
  const total = 4;
  const scores = {};
  
  for (const [key, value] of Object.entries(wuXingCount)) {
    scores[key] = Math.round((value / total) * 100);
  }
  
  return scores;
}

/**
 * 五行相生相克分析
 */
export function analyzeWuXingBalance(scores) {
  const { 木, 火, 土, 金, 水 } = scores;
  
  let balance = 50; // 基础平衡分
  
  // 木克土，土克水，水克火，火克金，金克木
  // 木生火，火生土，土生金，金生水，水生木
  
  if (木 > 40 && 土 < 30) balance -= 15; // 木旺克土
  if (土 > 40 && 水 < 30) balance -= 15; // 土旺克水
  if (水 > 40 && 火 < 30) balance -= 15; // 水旺克火
  if (火 > 40 && 金 < 30) balance -= 15; // 火旺克金
  if (金 > 40 && 木 < 30) balance -= 15; // 金旺克木
  
  if (木 > 30 && 火 > 30) balance += 10; // 木生火，气流通
  if (火 > 30 && 土 > 30) balance += 10; // 火生土，气流通
  if (土 > 30 && 金 > 30) balance += 10; // 土生金，气流通
  if (金 > 30 && 水 > 30) balance += 10; // 金生水，气流通
  if (水 > 30 && 木 > 30) balance += 10; // 水生木，气流通
  
  return Math.max(0, Math.min(100, balance));
}

/**
 * 五行颜色映射
 */
export const wuXingColors = {
  '木': { color: '#4CAF50', name: '木 Wood', emoji: '🌲' },
  '火': { color: '#F44336', name: '火 Fire', emoji: '🔥' },
  '土': { color: '#795548', name: '土 Earth', emoji: '🏔️' },
  '金': { color: '#FFC107', name: '金 Metal', emoji: '⚪' },
  '水': { color: '#2196F3', name: '水 Water', emoji: '💧' },
};
