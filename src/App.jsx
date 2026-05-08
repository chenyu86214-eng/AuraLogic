import { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Input from './pages/Input';
import Chart from './pages/Chart';
import { getZiweiChart, getBaZiChart } from './lib/astro';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [birthInfo, setBirthInfo] = useState(null);
  const [ziweiData, setZiweiData] = useState(null);
  const [baziData, setBaZiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 加载保存的数据
  useEffect(() => {
    const savedBirthInfo = localStorage.getItem('auralogic_birth_info');
    if (savedBirthInfo) {
      try {
        const info = JSON.parse(savedBirthInfo);
        setBirthInfo(info);
        // 自动生成命盘
        generateCharts(info);
      } catch (e) {
        console.error('Failed to load saved data:', e);
      }
    }
  }, []);

  // 处理导航
  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 处理出生信息提交
  const handleBirthInfoSubmit = (info) => {
    setLoading(true);
    setError(null);
    
    try {
      // 保存到localStorage
      localStorage.setItem('auralogic_birth_info', JSON.stringify(info));
      setBirthInfo(info);
      
      // 生成命盘
      generateCharts(info);
      
      // 跳转到首页
      setCurrentPage('home');
    } catch (e) {
      setError('Failed to generate charts. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // 生成命盘数据
  const generateCharts = (info) => {
    console.log('=== generateCharts called with:', info);
    try {
      // 紫微斗数排盘
      const ziwei = getZiweiChart(
        info.birthDate,
        parseInt(info.birthTime),
        info.gender,
        info.isSolar,
        'en-US'
      );
      
      console.log('=== ziwei result:', ziwei);
      
      if (ziwei.success) {
        setZiweiData(ziwei);
      } else {
        console.error('Ziwei generation failed:', ziwei.error);
        setError('紫微排盘失败: ' + (ziwei.error || '未知错误'));
      }
      
      // 八字排盘
      const bazi = getBaZiChart(
        info.birthDate,
        parseInt(info.birthTime),
        info.isSolar
      );
      
      console.log('=== bazi result:', bazi);
      
      if (bazi.success) {
        setBaZiData(bazi);
      } else {
        console.error('BaZi generation failed:', bazi.error);
        setError('八字排盘失败: ' + (bazi.error || '未知错误'));
      }
    } catch (e) {
      console.error('Chart generation error:', e);
      setError('排盘出错: ' + e.message);
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" 
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}>
          <div className="text-center">
            <div 
              className="w-16 h-16 mx-auto rounded-full mb-4"
              style={{ 
                background: 'linear-gradient(135deg, var(--violet), var(--amethyst))',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
            <p style={{ color: 'var(--lavender)' }}>Generating your destiny chart...</p>
          </div>
        </div>
      )}

      {error && (
        <div 
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl"
          style={{ 
            background: 'rgba(244,67,54,0.2)',
            border: '1px solid rgba(244,67,54,0.4)',
            color: '#F44336',
          }}
        >
          {error}
        </div>
      )}

      {currentPage === 'home' && (
        <Home 
          birthInfo={birthInfo}
          ziweiData={ziweiData}
          baziData={baziData}
          onNavigate={handleNavigate}
        />
      )}
      
      {currentPage === 'input' && (
        <Input 
          onSubmit={handleBirthInfoSubmit}
          initialData={birthInfo}
        />
      )}
      
      {currentPage === 'chart' && (
        <Chart 
          birthInfo={birthInfo}
          ziweiData={ziweiData}
          baziData={baziData}
          onNavigate={handleNavigate}
        />
      )}
    </Layout>
  );
}

export default App;
