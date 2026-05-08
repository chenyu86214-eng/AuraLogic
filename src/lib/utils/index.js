import Lunar from 'lunar-javascript';

/**
 * 格式化日期
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 格式化时间为12小时制
 */
export function formatTime(hour) {
  const h = parseInt(hour, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:00 ${ampm}`;
}

/**
 * 将小时转换为中文时辰
 */
export function hourToShiChen(hour) {
  const shiChenMap = {
    0: '子时', 1: '子时', 2: '丑时', 3: '丑时',
    4: '寅时', 5: '寅时', 6: '卯时', 7: '卯时',
    8: '辰时', 9: '辰时', 10: '巳时', 11: '巳时',
    12: '午时', 13: '午时', 14: '未时', 15: '未时',
    16: '申时', 17: '申时', 18: '酉时', 19: '酉时',
    20: '戌时', 21: '戌时', 22: '亥时', 23: '亥时',
  };
  return shiChenMap[hour] || '未知';
}

/**
 * 获取当前农历日期
 */
export function getCurrentLunarDate() {
  const now = new Date();
  const lunar = Lunar.Solar.fromYmd(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
  ).getLunar();
  
  return {
    year: lunar.getYearInChinese(),
    month: lunar.getMonthInChinese(),
    day: lunar.getDayInChinese(),
  };
}

/**
 * 计算年龄
 */
export function calculateAge(birthDate) {
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const monthDiff = now.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * 防抖函数
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 深拷贝
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 随机生成ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * 存储数据到localStorage
 */
export function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('保存到localStorage失败:', e);
    return false;
  }
}

/**
 * 从localStorage读取数据
 */
export function loadFromStorage(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('从localStorage读取失败:', e);
    return null;
  }
}
