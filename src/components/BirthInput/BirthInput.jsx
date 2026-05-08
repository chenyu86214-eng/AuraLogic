import { useState } from 'react';

export default function BirthInput({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    birthDate: initialData.birthDate || '',
    birthTime: initialData.birthTime || '12',
    gender: initialData.gender || 'male',
    isSolar: initialData.isSolar !== false,
    location: initialData.location || '',
    ...initialData,
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // 清除错误
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.birthDate) {
      newErrors.birthDate = 'Please enter birth date';
    } else {
      const date = new Date(formData.birthDate);
      if (isNaN(date.getTime())) {
        newErrors.birthDate = 'Invalid date format';
      } else if (date > new Date()) {
        newErrors.birthDate = 'Birth date cannot be in the future';
      }
    }
    
    if (!formData.birthTime) {
      newErrors.birthTime = 'Please select birth hour';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center p-6">
      <div 
        className="w-full max-w-md rounded-3xl p-8"
        style={{ 
          background: 'rgba(28,24,56,0.9)',
          border: '1px solid rgba(180,160,240,0.15)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-4"
            style={{ 
              background: 'linear-gradient(135deg, var(--violet), var(--amethyst))',
              boxShadow: 'var(--glow-violet)',
            }}
          >
            ✦
          </div>
          <h2 className="font-serif text-2xl font-semibold mb-2" style={{ color: '#EDE8F8' }}>
            Enter Your Birth Info
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            输入您的出生信息，开始命盘解读之旅
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>
              NAME / 姓名（可选）
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Stella"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{ 
                background: 'rgba(36,31,66,0.6)',
                border: '1px solid rgba(180,160,240,0.15)',
                color: '#EDE8F8',
              }}
            />
          </div>

          {/* Birth Date */}
          <div>
            <label className="block text-xs mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>
              BIRTH DATE / 出生日期 *
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{ 
                background: 'rgba(36,31,66,0.6)',
                border: `1px solid ${errors.birthDate ? '#F44336' : 'rgba(180,160,240,0.15)'}`,
                color: '#EDE8F8',
              }}
            />
            {errors.birthDate && (
              <p className="text-xs mt-1" style={{ color: '#F44336' }}>{errors.birthDate}</p>
            )}
          </div>

          {/* Birth Time */}
          <div>
            <label className="block text-xs mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>
              BIRTH HOUR / 出生时辰 *
            </label>
            <select
              name="birthTime"
              value={formData.birthTime}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all appearance-none cursor-pointer"
              style={{ 
                background: 'rgba(36,31,66,0.6)',
                border: `1px solid ${errors.birthTime ? '#F44336' : 'rgba(180,160,240,0.15)'}`,
                color: '#EDE8F8',
              }}
            >
              <option value="">Select hour...</option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {i.toString().padStart(2, '0')}:00 - {i.toString().padStart(2, '0')}:59
                </option>
              ))}
            </select>
            {errors.birthTime && (
              <p className="text-xs mt-1" style={{ color: '#F44336' }}>{errors.birthTime}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>
              GENDER / 性别 *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, gender: 'male' }))}
                className="py-3 rounded-xl text-sm font-medium transition-all border cursor-pointer"
                style={{
                  background: formData.gender === 'male' 
                    ? 'linear-gradient(135deg, rgba(112,85,184,0.4), rgba(78,58,142,0.3))'
                    : 'rgba(36,31,66,0.6)',
                  border: formData.gender === 'male' 
                    ? '1px solid rgba(180,160,240,0.4)'
                    : '1px solid rgba(180,160,240,0.15)',
                  color: formData.gender === 'male' ? 'var(--lavender)' : 'var(--text-secondary)',
                }}
              >
                ♂ Male / 男
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, gender: 'female' }))}
                className="py-3 rounded-xl text-sm font-medium transition-all border cursor-pointer"
                style={{
                  background: formData.gender === 'female' 
                    ? 'linear-gradient(135deg, rgba(112,85,184,0.4), rgba(78,58,142,0.3))'
                    : 'rgba(36,31,66,0.6)',
                  border: formData.gender === 'female' 
                    ? '1px solid rgba(180,160,240,0.4)'
                    : '1px solid rgba(180,160,240,0.15)',
                  color: formData.gender === 'female' ? 'var(--lavender)' : 'var(--text-secondary)',
                }}
              >
                ♀ Female / 女
              </button>
            </div>
          </div>

          {/* Calendar Type */}
          <div>
            <label className="block text-xs mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>
              CALENDAR TYPE / 日历类型
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, isSolar: true }))}
                className="py-3 rounded-xl text-sm font-medium transition-all border cursor-pointer"
                style={{
                  background: formData.isSolar 
                    ? 'linear-gradient(135deg, rgba(112,85,184,0.4), rgba(78,58,142,0.3))'
                    : 'rgba(36,31,66,0.6)',
                  border: formData.isSolar 
                    ? '1px solid rgba(180,160,240,0.4)'
                    : '1px solid rgba(180,160,240,0.15)',
                  color: formData.isSolar ? 'var(--lavender)' : 'var(--text-secondary)',
                }}
              >
                ☀️ Solar / 阳历
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, isSolar: false }))}
                className="py-3 rounded-xl text-sm font-medium transition-all border cursor-pointer"
                style={{
                  background: !formData.isSolar 
                    ? 'linear-gradient(135deg, rgba(112,85,184,0.4), rgba(78,58,142,0.3))'
                    : 'rgba(36,31,66,0.6)',
                  border: !formData.isSolar 
                    ? '1px solid rgba(180,160,240,0.4)'
                    : '1px solid rgba(180,160,240,0.15)',
                  color: !formData.isSolar ? 'var(--lavender)' : 'var(--text-secondary)',
                }}
              >
                🌙 Lunar / 农历
              </button>
            </div>
          </div>

          {/* Location (for true solar time) */}
          <div>
            <label className="block text-xs mb-2" style={{ color: 'var(--text-muted)', letterSpacing: '1px' }}>
              BIRTH LOCATION / 出生地点（用于真太阳时校正）
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Beijing, China"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{ 
                background: 'rgba(36,31,66,0.6)',
                border: '1px solid rgba(180,160,240,0.15)',
                color: '#EDE8F8',
              }}
            />
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-ghost)' }}>
              输入城市名称，系统将自动进行真太阳时校正
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl text-sm font-medium transition-all cursor-pointer mt-6"
            style={{
              background: 'linear-gradient(135deg, var(--violet), var(--amethyst))',
              color: 'white',
              boxShadow: 'var(--glow-violet)',
            }}
          >
            Generate Your Destiny Chart ✦
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-center text-[10px] mt-6" style={{ color: 'var(--text-ghost)' }}>
          您的数据仅在本地处理，不会上传到任何服务器
        </p>
      </div>
    </div>
  );
}
