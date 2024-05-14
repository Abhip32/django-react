import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface StockDataPoint {
  x: Date;
  y: [number, number, number, number];
}

interface StockChartProps {
  symbol: string;
}

const StockChart: React.FC<StockChartProps> = ({ symbol }) => {
  const [stockData, setStockData] = useState<StockDataPoint[]>([]);
  const [metadata, setMetadata] = useState<string>('');

  const fetchData = async () => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=KPVXNRUAIOSG8C2X`;
    try {
      const response = await axios.get(url);
      const timeSeriesData = response?.data['Time Series (5min)'];
      if (timeSeriesData) {
        setMetadata(response?.data['Meta Data']['2. Symbol']);
        const dataArray = Object.keys(timeSeriesData).map(key => ({
          x: new Date(key),
          y: [
            parseFloat(timeSeriesData[key]['1. open']),
            parseFloat(timeSeriesData[key]['2. high']),
            parseFloat(timeSeriesData[key]['3. low']),
            parseFloat(timeSeriesData[key]['4. close'])
          ]
        })) as StockDataPoint[];
        setStockData(dataArray);
      } else {
        setStockData([]);
        setMetadata('');
      }
    } catch (error) {
      console.error('Failed to fetch stock data:', error.response?.data?.detail || 'An error occurred');
      setStockData([]);
      setMetadata('');
    }
  };

  useEffect(() => {
    if (symbol) {
      fetchData();
    }
  }, [symbol]);

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: 'light2',
    exportFileName: 'StockChart',
    title: {
      text: ''
    },
    axisX: {
      interval: 1,
      intervalType: 'minutes',
      valueFormatString: 'HH:mm:ss'
    },
    axisY: {
      prefix: '$',
      title: 'Price (in USD)'
    },
    data: [
      {
        type: 'ohlc',
        yValueFormatString: '$###0.00',
        xValueFormatString: 'HH:mm:ss',
        dataPoints: stockData
      }
    ]
  };

  return (
    <Box margin="20px" maxWidth={'100vw'}>
      <Typography variant="h6" fontWeight="bold">
        Stock Data for {metadata}:
      </Typography>
      <CanvasJSChart options={options} />
    </Box>
  );
};

export default StockChart;
