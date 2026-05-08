import { astro } from 'iztro';
import Lunar from 'lunar-javascript';

/**
 * 紫微斗数排盘核心函数
 * iztro API参考: https://www.iztro.com/
 */
export function getZiweiChart(birthDate, birthTime, gender, isSolar = true, locale = 'zh-CN') {
  try {
    // iztro排盘 - bySolar返回的对象中palaces是属性不是方法
    const astrolabe = isSolar
      ? astro.bySolar(birthDate, birthTime, gender, true, locale)
      : astro.byLunar(birthDate, birthTime, gender, false, true, locale);

    console.log('iztro astrolabe raw:', astrolabe);
    console.log('iztro palaces type:', typeof astrolabe.palaces, Array.isArray(astrolabe.palaces));

    // palaces是属性（数组），不是方法调用
    const palaceList = Array.isArray(astrolabe.palaces) ? astrolabe.palaces : [];
    
    // 获取命宫 - palace方法用中文名查找
    let lifePalace = null;
    try {
      lifePalace = astrolabe.palace('命宫');
    } catch(e) {
      // 如果palace方法不可用，从palaces数组中查找
      lifePalace = palaceList.find(p => p.name === '命宫') || palaceList[0];
    }

    // 映射宫位名称
    const nameMap = {
      'life': '命宫', 'siblings': '兄弟宫', 'spouse': '夫妻宫',
      'children': '子女宫', 'wealth': '财帛宫', 'health': '疾厄宫',
      'migration': '迁移宫', 'servants': '奴仆宫', 'career': '官禄宫',
      'property': '田宅宫', 'fortune': '福德宫', 'parents': '父母宫',
      // 中文直接返回
      '命宫': '命宫', '兄弟宫': '兄弟宫', '夫妻宫': '夫妻宫',
      '子女宫': '子女宫', '财帛宫': '财帛宫', '疾厄宫': '疾厄宫',
      '迁移宫': '迁移宫', '奴仆宫': '奴仆宫', '官禄宫': '官禄宫',
      '田宅宫': '田宅宫', '福德宫': '福德宫', '父母宫': '父母宫',
    };

    // 获取12宫位数据
    const palaces = palaceList.map((p, index) => ({
      index: index,
      name: nameMap[p.name] || p.name,
      nameEN: p.name,
      heavenlyStem: p.heavenlyStem || '',
      earthlyBranch: p.earthlyBranch || '',
      majorStars: (p.majorStars || []).map(s => typeof s === 'string' ? s : s.name),
      minorStars: (p.minorStars || []).map(s => typeof s === 'string' ? s : s.name),
      adjectiveStars: (p.adjectiveStars || []).map(s => typeof s === 'string' ? s : s.name),
      mutagens: (p.majorStars || []).filter(s => s && s.mutagen).map(s => s.mutagen),
      changsheng12: p.changsheng12 || '',
      isBodyPalace: p.isBodyPalace || false,
    }));
    
    // 获取主星列表
    const mainStars = [];
    palaces.forEach(p => {
      p.majorStars.forEach(star => {
        if (!mainStars.includes(star)) {
          mainStars.push(star);
        }
      });
    });

    // 获取四柱（从chineseDate字段或astrolabe属性）
    const chineseDate = astrolabe.chineseDate || '';
    const fourColumns = parseChineseDate(chineseDate);

    return {
      success: true,
      astrolabe,
      fourColumns,
      palaces,
      mainStars,
      lunarInfo: getLunarInfo(birthDate, birthTime, isSolar),
      lifePalace: lifePalace ? {
        name: nameMap[lifePalace.name] || lifePalace.name,
        majorStars: (lifePalace.majorStars || []).map(s => typeof s === 'string' ? s : s.name),
        heavenlyStem: lifePalace.heavenlyStem || '',
        earthlyBranch: lifePalace.earthlyBranch || '',
      } : null,
      solarDate: astrolabe.solarDate || birthDate,
      lunarDate: astrolabe.lunarDate || '',
      sign: astrolabe.sign || '',
      zodiac: astrolabe.zodiac || '',
      fiveElementsClass: astrolabe.fiveElementsClass || '',
      soul: astrolabe.soul || '',
      body: astrolabe.body || '',
    };
  } catch (error) {
    console.error('紫微斗数排盘失败:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 解析chineseDate字段为四柱
 */
function parseChineseDate(chineseDate) {
  if (!chineseDate) return { year: '', month: '', day: '', hour: '' };
  const parts = chineseDate.split(' ');
  return {
    year: parts[0] || '',
    month: parts[1] || '',
    day: parts[2] || '',
    hour: parts[3] || '',
  };
}

/**
 * 获取农历信息
 */
function getLunarInfo(dateStr, hour, isSolar) {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    
    const solar = Lunar.Solar.fromYmd(year, month, day);
    const lunarDate = solar.getLunar();
    
    // 获取八字
    const bazi = lunarDate.getBaZi();
    
    return {
      lunarDateStr: lunarDate.toString(),
      yearGanZhi: bazi[0] || '',
      monthGanZhi: bazi[1] || '',
      dayGanZhi: bazi[2] || '',
      hourGanZhi: bazi[3] || '',
    };
  } catch (e) {
    console.error('获取农历信息失败:', e);
    return { lunarDateStr: '', yearGanZhi: '', monthGanZhi: '', dayGanZhi: '', hourGanZhi: '' };
  }
}
