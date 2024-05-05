// import { Line } from '@ant-design/plots';
import { Line } from '@ant-design/charts';

interface DataType {
  data: any,
  xField: string,
}

function TotalRevenueSystem ({data, xField}: DataType) {
  // console.log('data', data);
  // console.log('xField', xField);
  

  const config = {
    data,
    xField: `${xField}`,
    yField: 'revenue',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return (
    <>
      <Line {...config} />
    </>
  ) 
}

export default TotalRevenueSystem;

// ReactDOM.render(<TotalRevenueSystem />, document.getElementById('container'))