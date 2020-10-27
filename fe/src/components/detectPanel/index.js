import React, { useEffect, useState } from "react";
import { Button } from 'antd';
import ReactEcharts from 'echarts-for-react'

import 'antd/dist/antd.css';
import '../../style/detectPanel.css';

const DetectPanel = (prop) => {

  const { data } = prop;
  const { requestData, responseData } = data;

  const rangeData = responseData.map(v => [{xAxis: v[0]}, {xAxis: v[1]}]);

  const option = {
    title: {
      text: '故障检测结果',
      subtext: '红色阴影区域为故障发生区域',
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
        markArea: {
          silent: true,
          itemStyle: {
            color: 'rgba(188,0,0,0.3)'
          },
          data: rangeData
        },
      },
    ]
  };

  return (
    <div className="detect-panel"> 
        <ReactEcharts
          option={ option }
          style={{height: '300px', width: '100%'}}
        />
    </div>
  );
};
export default DetectPanel;






