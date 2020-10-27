import React from "react";
import ReactEcharts from 'echarts-for-react'

import 'antd/dist/antd.css';
import '../../style/paddingPanel.css';

const PaddingPanel = ( prop ) => {

  const { data } = prop;
  const { responseData } = data;

  const option = {
    title: {
      text: '缺失值填充后的数据',
      subtext: '',
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
        data: Array.from([...Array(responseData.length)].keys())
    },
    yAxis: {
        type: 'value'
    },
    series: [
      {
        data:  responseData.map(v => parseFloat(v[1])),
        type: 'line',
        lineStyle: {
          width: 2
        },
        symbol: 'none',
      },
    ]
  };

  return (
    <div className="padding-panel"> 
        <ReactEcharts
          option={ option }
          style={{height: '300px', width: '100%'}}
        />
    </div>
  );
};
export default PaddingPanel;












