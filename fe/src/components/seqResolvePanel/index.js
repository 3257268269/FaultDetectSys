import React from "react";
import ReactEcharts from 'echarts-for-react'

import 'antd/dist/antd.css';
import '../../style/seqResolvePanel.css';

const SeqResolvePanel = ( prop ) => {

  const { data } = prop;
  const { responseData } = data;
  const { resid, seasonal, trend } = responseData;

  console.log(resid);

  const option = {
    title: {
      text: '序列分解后的数据',
      subtext: '',
      left: 'center',
      align: 'right'
    },
    tooltip: {
      trigger: 'axis'
    },

    legend: {
      data: ['resid', 'seasonal', 'trend'],
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
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
        data: Array.from([...Array(resid.length)].keys())
    },
    yAxis: {
        type: 'value'
    },
    series: [
      {
        name: 'resid',
        data: resid.map(v => parseFloat(v[1])),
        type: 'line',
        lineStyle: {
          width: 2
        },
        symbol: 'none',
      },
      {
        name: 'seasonal',
        data: seasonal.map(v => parseFloat(v[1])),
        type: 'line',
        lineStyle: {
          width: 2
        },
        symbol: 'none',
      },
      {
        name: 'trend',
        data: trend.map(v => parseFloat(v[1])),
        type: 'line',
        lineStyle: {
          width: 2
        },
        symbol: 'none',
      },
    ]
  };

  console.log(option);

  return (
    <div className="seqResolve-panel"> 
        <ReactEcharts
          option={ option }
          style={{height: '300px', width: '100%'}}
        />
    </div>
  );
};
export default SeqResolvePanel;

















