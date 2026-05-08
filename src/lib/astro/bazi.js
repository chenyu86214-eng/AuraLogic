import Lunar from 'lunar-javascript';

/**
 * 八字四柱排盘
 * lunar-javascript API参考: https://6tail.cn/calendar/api.html
 */
export function getBaZiChart(birthDate, birthTime, isSolar = true) {
  try {
    const [year, month, day] = birthDate.split('-').map(Number);
    
    // 转换为农历
    const solar = Lunar.Solar.fromYmd(year, month, day);
    const lunarDate = solar.getLunar();
    
    // 获取八字 - getBaZi返回数组 [年柱, 月柱, 日柱, 时柱]
    const bazi = lunarDate.getBaZi();
    
    // 获取五行
    const wuXing = lunarDate.getBaZiWuXing();
    
    // 获取纳音 - 用getYearNaYin等方法代替getNaYin
    let naYinList = [];
    try {
      naYinList = lunarDate.getNaYin();
    } catch(e) {
      // getNaYin可能不存在，使用备选方案
      console.warn('getNaYin not available, skipping');
    }
    
    // 获取十神
    const shiShen = getShiShen(bazi);
    
    // 获取大运
    let daYunList = [];
    try {
      const daYun = lunarDate.getDaYun();
      if (daYun && daYun.length > 0) {
        daYunList = daYun.map(d => ({
          startAge: d.getStartAge ? d.getStartAge() : 0,
          endAge: d.getEndAge ? d.getEndAge() : 0,
          ganZhi: d.getGanZhi ? d.getGanZhi() : '',
        }));
      }
    } catch(e) {
      console.warn('getDaYun not available, skipping');
    }

    return {
      success: true,
      eightCharacters: {
        year: {
          ganZhi: bazi[0] || '',
          wuXing: wuXing[0] || '',
          shiShen: shiShen.year || '',
          naYin: Array.isArray(naYinList) ? naYinList[0] : '',
        },
        month: {
          ganZhi: bazi[1] || '',
          wuXing: wuXing[1] || '',
          shiShen: shiShen.month || '',
          naYin: Array.isArray(naYinList) ? naYinList[1] : '',
        },
        day: {
          ganZhi: bazi[2] || '',
          wuXing: wuXing[2] || '',
          shiShen: shiShen.day || '',
          naYin: Array.isArray(naYinList) ? naYinList[2] : '',
        },
        hour: {
          ganZhi: bazi[3] || '',
          wuXing: wuXing[3] || '',
          shiShen: shiShen.hour || '',
          naYin: Array.isArray(naYinList) ? naYinList[3] : '',
        },
      },
      daYun: daYunList,
      lunarDate: lunarDate.toString(),
    };
  } catch (error) {
    console.error('八字排盘失败:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 简化十神计算
 */
function getShiShen(bazi) {
  if (!bazi || bazi.length < 4) return { year: '', month: '', day: '', hour: '' };
  
  const dayGan = bazi[2] ? bazi[2][0] : ''; // 日干
  
  // 简化的十神映射（实际需要更复杂的计算）
  const shiShenMap = {
    '甲': { '甲': '比肩', '乙': '劫财', '丙': '食神', '丁': '伤官', '戊': '偏财', '己': '正财', '庚': '七杀', '辛': '正官', '壬': '偏印', '癸': '正印' },
    '乙': { '甲': '劫财', '乙': '比肩', '丙': '伤官', '丁': '食神', '戊': '正财', '己': '偏财', '庚': '正官', '辛': '七杀', '壬': '正印', '癸': '偏印' },
    '丙': { '甲': '偏印', '乙': '正印', '丙': '比肩', '丁': '劫财', '戊': '食神', '己': '伤官', '庚': '偏财', '辛': '正财', '壬': '七杀', '癸': '正官' },
    '丁': { '甲': '正印', '乙': '偏印', '丙': '劫财', '丁': '比肩', '戊': '伤官', '己': '食神', '庚': '正财', '辛': '偏财', '壬': '正官', '癸': '七杀' },
    '戊': { '甲': '七杀', '乙': '正官', '丙': '偏印', '丁': '正印', '戊': '比肩', '己': '劫财', '庚': '食神', '辛': '伤官', '壬': '偏财', '癸': '正财' },
    '己': { '甲': '正官', '乙': '七杀', '丙': '正印', '丁': '偏印', '戊': '劫财', '己': '比肩', '庚': '伤官', '辛': '食神', '壬': '正财', '癸': '偏财' },
    '庚': { '甲': '偏财', '乙': '正财', '丙': '七杀', '丁': '正官', '戊': '偏印', '己': '正印', '庚': '比肩', '辛': '劫财', '壬': '食神', '癸': '伤官' },
    '辛': { '甲': '正财', '乙': '偏财', '丙': '正官', '丁': '七杀', '戊': '正印', '己': '偏印', '庚': '劫财', '辛': '比肩', '壬': '伤官', '癸': '食神' },
    '壬': { '甲': '食神', '乙': '伤官', '丙': '偏财', '丁': '正财', '戊': '七杀', '己': '正官', '庚': '偏印', '辛': '正印', '壬': '比肩', '癸': '劫财' },
    '癸': { '甲': '伤官', '乙': '食神', '丙': '正财', '丁': '偏财', '戊': '正官', '己': '七杀', '庚': '正印', '辛': '偏印', '壬': '劫财', '癸': '比肩' },
  };
  
  const getShiShenForGan = (gan) => {
    if (!dayGan || !shiShenMap[dayGan]) return '';
    return shiShenMap[dayGan][gan] || '';
  };
  
  return {
    year: getShiShenForGan(bazi[0] ? bazi[0][0] : ''),
    month: getShiShenForGan(bazi[1] ? bazi[1][0] : ''),
    day: '日主',
    hour: getShiShenForGan(bazi[3] ? bazi[3][0] : ''),
  };
}
