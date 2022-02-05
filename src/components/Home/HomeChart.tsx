import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type IProps = {
  data: any;
};
const HomeChart = (props: IProps) => {
  const categoryChartRef = useRef(null);
  console.log(props.data);
  useEffect(() => {
    initChart(props.data.data);
    return () => {};
  }, []);

  const initChart = (data: any) => {
    const chartData = data.rows
      .filter((item: any) => item.blogNumber)
      .map((item: any) => ({ value: item.blogNumber, name: item.name }));
    if (categoryChartRef.current) {
      const chart = echarts.init(categoryChartRef.current);
      const option = {
        tooltip: {},
        legend: {
          type: 'scroll',
        },
        series: {
          name: 'pie',
          type: 'pie',
          data: chartData,
        },
      };
      chart.setOption(option);
    }
  };
  return (
    <div
      id="category-chart"
      ref={categoryChartRef}
      style={{ width: '100%', height: 300 }}
    ></div>
  );
};

export default HomeChart;
