import { astro } from 'iztro';
import Lunar from 'lunar-javascript';

/**
 * 紫微斗数排盘核心函数
 */
export function getZiweiChart(birthDate, birthTime, gender, isSolar = true, locale = 'en-US') {
  try {
    // iztro排盘
    const astrolabe = isSolar
      ? astro.bySolar(birthDate, birthTime, gender, true, locale)
      : astro.byLunar(birthDate, birthTime, gender, false, true, locale);

    // 获取四柱信息
    const fourColumns = astrolabe.palaces();
    
    // 获取命宫
    const lifePalace = astrolabe.palace('life');
    
    // 获取12宫位
    const palaces = astrolabe.palaces().map((p, index) => ({
      index: p.index,
      name: getPalaceNameCN(p.name),
      nameEN: p.name,
      heavenlyStem: p.heavenlyStem,
      earthlyBranch: p.earthlyBranch,
      majorStars: p.majorStars?.map(s => s.name) || [],
      minorStars: p.minorStars?.map(s => s.name) || [],
      adjectiveStars: p.adjectiveStars?.map(s => s.name) || [],
      mutagens: p.majorStars?.filter(s => s.mutagen).map(s => s.mutagen) || [],
      changsheng12: p.changsheng12,
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

    return {
      success: true,
      astrolabe,
      fourColumns: {
        year: `${astrolabe.palaces()[0]?.heavenlyStem || ''}${astrolabe.palaces()[0]?.earthlyBranch || ''}`,
        month: `${astrolabe.palaces()[1]?.heavenlyStem || ''}${astrolabe.palaces()[1]?.earthlyBranch || ''}`,
        day: `${astrolabe.palaces()[2]?.heavenlyStem || ''}${astrolabe.palaces()[2]?.earthlyBranch || ''}`,
        hour: `${astrolabe.palaces()[3]?.heavenlyStem || ''}${astrolabe.palaces()[3]?.earthlyBranch || ''}`,
      },
      palaces,
      mainStars,
      lunarInfo: getLunarInfo(birthDate, birthTime, isSolar),
      lifePalace,
    };
  } catch (error) {
    console.error('紫微斗数排盘失败:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 获取宫位中文名称
 */
function getPalaceNameCN(name) {
  const nameMap = {
    'life': '命宫',
    'siblings': '兄弟宫',
    'spouse': '夫妻宫',
    'children': '子女宫',
    'wealth': '财帛宫',
    'health': '疾厄宫',
    'migration': '迁移宫',
    'servants': '奴仆宫',
    'career': '官禄宫',
    'property': '田宅宫',
    'fortune': '福德宫',
    'parents': '父母宫',
  };
  return nameMap[name] || name;
}

/**
 * 获取农历信息
 */
function getLunarInfo(dateStr, hour, isSolar) {
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    
    const lunarDate = isSolar 
      ? Lunar.Solar.fromYmd(year, month, day).getLunar()
      : Lunar.Lunar.fromYmd(year, month, day);
    
    const solarTerms = lunarDate.getSolarTerms();
    const festival = lunarDate.getFestivals()[0] || '';
    
    // 获取生辰八字
    const bazi = lunarDate.getBaZi();
    const baziWuXing = lunarDate.getBaZiWuXing();
    
    return {
      lunarYear: lunarDate.getYearInChinese(),
      lunarMonth: lunarDate.getMonthInChinese(),
      lunarDay: lunarDate.getDayInChinese(),
      zodiac: lunarDate.getShengXiao(),
      solarTerms: solarTerms ? solarTerms.getName() : '',
      festival,
      eightCharacters: {
        year: bazi[0],
        month: bazi[1],
        day: bazi[2],
        hour: bazi[3],
      },
      wuXing: {
        year: baziWuXing[0],
        month: baziWuXing[1],
        day: baziWuXing[2],
        hour: baziWuXing[3],
      },
      naYin: lunarDate.getNaYin(),
    };
  } catch (error) {
    console.error('农历信息获取失败:', error);
    return null;
  }
}

/**
 * 获取命宫主星
 */
export function getMingGongStars(astrolabe) {
  const mingGong = astrolabe.palace('life');
  return mingGong ? mingGong.majorStars?.map(s => s.name) || [] : [];
}

/**
 * 获取指定宫位的三方四正
 */
export function getSurroundingPalaces(astrolabe, palaceName) {
  const palace = astrolabe.palace(palaceName);
  return palace ? palace.surroundingPalaces?.()?.map(p => p.name) || [] : [];
}

/**
 * 简化的宫位名称（用于显示）
 */
export const shortPalaceNames = [
  '命宫', '兄弟', '夫妻', '子女',
  '财帛', '疾厄', '迁移', '奴仆',
  '官禄', '田宅', '福德', '父母'
];

/**
 * 星耀中英文映射
 */
export const starNameMap = {
  'general': '紫微星',
  'minister': '天相星',
  'sun': '太阳星',
  'moon': '太阴星',
  'tianji': '天机星',
  'wuqu': '武曲星',
  'tiantong': '天同星',
  'lianzhen': '廉贞星',
  'tianfu': '天府星',
  'tanlang': '贪狼星',
  'jumen': '巨门星',
  'tianliang': '天梁星',
  'qisha': '七杀星',
  'pojun': '破军星',
};
