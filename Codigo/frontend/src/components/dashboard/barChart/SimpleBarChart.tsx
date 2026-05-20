import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface SimpleBarChartProps {
  data: {
    name: string;
    yKey: number;
  }[];
  xAxisKey?: string;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, xAxisKey }) => {
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={"name"} />
      <YAxis width="auto" dataKey={"yKey"}/>
      <Tooltip active content={<div>Tooltip Content</div>}/>
      <Legend />
      <Bar 
        dataKey={xAxisKey} 
        fill="#8884d8" 
        activeBar={{ fill: 'pink', stroke: 'blue' }} 
        radius={[10, 10, 0, 0]} 
      />
    </BarChart>
  );
};

export default SimpleBarChart;