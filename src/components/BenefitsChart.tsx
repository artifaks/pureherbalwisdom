
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Herb } from '@/data/types';

interface BenefitsChartProps {
  herb: Herb;
}

const BenefitsChart: React.FC<BenefitsChartProps> = ({ herb }) => {
  // Generate random effectiveness scores for visualization purposes
  const data = herb.benefits.map((benefit, index) => {
    // Use a hash function to create a deterministic but seemingly random number
    const hash = benefit.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    // Generate a score between 60 and 100 based on the hash
    const score = 60 + Math.abs(hash % 40);
    
    return {
      name: benefit.length > 30 ? benefit.substring(0, 30) + '...' : benefit,
      effectiveness: score,
      fullName: benefit,
      color: getColorFromScore(score)
    };
  });

  // Function to get a color based on score
  function getColorFromScore(score: number) {
    if (score >= 85) return '#4CAF50';  // High effectiveness (green)
    if (score >= 70) return '#FF9800';  // Medium effectiveness (orange)
    return '#F44336';                   // Lower effectiveness (red)
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-md shadow-md border border-gray-200">
          <p className="text-sm font-medium text-gray-900">{payload[0].payload.fullName}</p>
          <p className="text-xs text-gray-600">
            Effectiveness: <span className="font-medium">{payload[0].value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" domain={[0, 100]} tickCount={6} />
          <YAxis 
            dataKey="name" 
            type="category" 
            width={150}
            tick={{ fontSize: 12 }}
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
  );
};

export default BenefitsChart;
