
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { Herb } from '@/data/types';
import { useTheme } from '@/components/ThemeProvider';

interface BenefitsChartProps {
  herb: Herb;
}

const BenefitsChart: React.FC<BenefitsChartProps> = ({ herb }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  // State to track window width for responsive adjustments
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Generate random effectiveness scores for visualization purposes
  const data = herb.benefits.map((benefit, index) => {
    // Use a hash function to create a deterministic but seemingly random number
    const hash = benefit.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    // Generate a score between 60 and 100 based on the hash
    const score = 60 + Math.abs(hash % 40);
    
    // Categorize effectiveness for the legend
    let category = 'Moderate';
    if (score >= 85) category = 'High';
    else if (score < 70) category = 'Baseline';
    
    return {
      name: benefit.length > 20 ? benefit.substring(0, 20) + '...' : benefit,
      effectiveness: score,
      fullName: benefit,
      category,
      color: getColorFromScore(score, isDarkMode)
    };
  });

  // Function to get a color based on score and theme
  function getColorFromScore(score: number, isDark: boolean) {
    if (score >= 85) return isDark ? '#7EB77E' : '#4CAF50';  // High effectiveness (green)
    if (score >= 70) return isDark ? '#FFB74D' : '#FF9800';  // Medium effectiveness (orange)
    return isDark ? '#EF9A9A' : '#F44336';                   // Lower effectiveness (red)
  }
  
  // Legend items for effectiveness categories
  const legendItems = [
    { value: 'High', color: getColorFromScore(85, isDarkMode) },
    { value: 'Moderate', color: getColorFromScore(75, isDarkMode) },
    { value: 'Baseline', color: getColorFromScore(65, isDarkMode) }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${isDarkMode ? 'bg-amber-900/90 border-amber-700' : 'bg-white border-gray-200'} p-3 rounded-md shadow-md border`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-amber-100' : 'text-gray-900'}`}>
            {payload[0].payload.fullName}
          </p>
          <p className={`text-xs ${isDarkMode ? 'text-amber-200' : 'text-gray-600'}`}>
            Effectiveness: <span className="font-medium">{payload[0].value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Custom legend component
  const CustomLegend = () => (
    <div className="flex justify-center mt-4 gap-4">
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center">
          <div 
            className="w-3 h-3 mr-1 rounded-sm" 
            style={{ backgroundColor: item.color }}
          />
          <span className={`text-xs ${isDarkMode ? 'text-amber-200' : 'text-gray-600'}`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );

  // Calculate appropriate YAxis width based on window size
  const yAxisWidth = windowWidth < 768 ? 100 : 150;
  
  return (
    <div className="w-full">
      <div className="w-full h-64 md:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
          >
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              tickCount={6} 
              tick={{ fill: isDarkMode ? '#e5d0a3' : '#333' }}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={yAxisWidth}
              tick={{ 
                fontSize: 11, 
                fill: isDarkMode ? '#e5d0a3' : '#333'
              }}
              tickMargin={8}
              tickFormatter={(value) => {
                // Ensure text fits in available space
                return value.length > 18 ? `${value.substring(0, 18)}...` : value;
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="effectiveness" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <CustomLegend />
    </div>
  );
};

export default BenefitsChart;
