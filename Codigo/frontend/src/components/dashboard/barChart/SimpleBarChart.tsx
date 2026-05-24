import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import * as S from './styles';

interface SimpleBarChartProps {
  data: {
    name: string;
    [key: string]: string | number; 
  }[];
  valueKey: string; 
  title: string;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, valueKey, title }) => {
  return (
    <>
      <S.SimpleChartContainer>
        <h2 style={{ color: '#777777' }}>{title}</h2>
        <ResponsiveContainer width="100%" height={350}>
          
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey={valueKey} /> 
            <Tooltip />
            <Legend />
            <Bar 
              dataKey={valueKey} 
              fill="#3b82f6"
              radius={[6, 6, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </S.SimpleChartContainer>
    </>
  );
};

export default SimpleBarChart;