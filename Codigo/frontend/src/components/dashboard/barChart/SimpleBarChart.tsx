import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface SimpleBarChartProps {
  data: {
    name: string;
    key: number;
  }[];
  style?: React.CSSProperties;
  color?: string | "#001529";
  key: string | number;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, color, key }) => {
  return (
    <BarChart
      style={{ width: '100%', maxWidth: 'calc(50% - 10px)', maxHeight: '70vh', aspectRatio: 1.618 }}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={key} fill={color} radius={[10, 10, 0, 0]} />
    </BarChart>
  );
};

export default SimpleBarChart;