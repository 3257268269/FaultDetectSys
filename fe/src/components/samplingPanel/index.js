import React from "react";
import ReactEcharts from 'echarts-for-react'

import 'antd/dist/antd.css';
import '../../style/samplingPanel.css';

const SamplingPanel = ( prop ) => {

  const { data } = prop;

  const option = {
    title: {
      text: '降采样后的数据',
      subtext: '简要描述',
      left: 'center',
      align: 'right'
    },
    tooltip: {
      trigger: 'axis'
    },
    dataZoom: [
      {
        show: true,
      },
      {
        type: 'inside',
      }
    ],
    xAxis: {
        type: 'category',
        data: Array.from([...Array(data.length)].keys())
    },
    yAxis: {
        type: 'value'
    },
    series: [
      {
        data:  data.map(v => parseFloat(v.data[1])),
        type: 'line',
        lineStyle: {
          width: 2
        },
        symbol: 'none',
      },
    ]
  };

  return (
    <div className="sampling-panel"> 
        <ReactEcharts
          option={ option }
          style={{height: '300px', width: '100%'}}
        />
    </div>
  );
};
export default SamplingPanel;












