import React from "react";
import ReactEcharts from 'echarts-for-react'

import 'antd/dist/antd.css';
import '../../style/sourceDataPanel.css';

const SourceDataPanel = ( prop ) => {

  const { data } = prop;
  const { requestData } = data;

  const option = {
    title: {
      text: '原始数据',
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
        data: Array.from([...Array(requestData.length)].keys())
    },
    yAxis: {
        type: 'value'
    },
    series: [
      {
        data:  requestData.map(v => parseFloat(v[1])),
        type: 'line',
        lineStyle: {
          width: 2
        },
        symbol: 'none',
      },
    ]
  };

  return (
    <div className="sourceData-panel"> 
        <ReactEcharts
          option={ option }
          style={{height: '300px', width: '100%'}}
        />
    </div>
  );
};
export default SourceDataPanel;






