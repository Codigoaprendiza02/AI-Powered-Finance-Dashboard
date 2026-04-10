import React, { useMemo, useState } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material';
import DashboardBox from '../../components/DashboardBox';
import { useGetKpisQuery } from '../../state/api';
import FlexBetween from '../../components/FlexBetween';
import { CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import regression, {type DataPoint} from 'regression';

const Predictions = () => {
    const {palette} = useTheme();
    const [isPredictions, setIsPredictions] = useState(false);
    const {data : kpiData} = useGetKpisQuery();
    const formattedData = useMemo(() => {
      if (!kpiData) return [];
      const monthData = kpiData[0].monthlyData;
      const formatted : Array<DataPoint>= monthData.map(({ revenue }, i:number) => {
        return [i, revenue];
      });
      const regressionLine = regression.linear(formatted);
      return monthData.map(({ month, revenue }, i:number) => {
        return {
          name: month,
          "Actual Revenue": revenue,
          "Regression Line": regressionLine.points[i][1],
          "Predicted Revenue": regressionLine.predict(i+12)[1]
        };
      });
    }, [kpiData]);

  return (
    <DashboardBox 
      width="100%" 
      height="100%" 
      p="1rem" 
      overflow="hidden"
    >
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3" color={palette.grey[700]} fontWeight="bold">
            Revenue and Predictions
          </Typography>
          <Typography variant="h6" color={palette.grey[500]}>
            Forecasting the next 5 years of revenue using machine learning
          </Typography>
        </Box>
        <Button onClick={() => setIsPredictions(!isPredictions)} 
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.4)",
            "&:hover": {backgroundColor: palette.grey[700], color: palette.grey[900]}
          }}
        >
          {isPredictions ? "Show Revenue" : "Show Predictions"}
        </Button>
      </FlexBetween>
          <LineChart
            style={{ width: '100%', maxWidth: '1300px', maxHeight: '700px', height: '100%'}}
            responsive
            data={formattedData}
            margin={{
              top: 20,
              right: 5,
              left: 20,
              bottom: 80,
            }}
            onContextMenu={(_, e) => e.preventDefault()}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{fontSize : "10px"}}>
              <Label value="Month" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis domain={[12000, 27000]} axisLine={{strokeWidth : "0"}} style={{fontSize : "10px"}} tickFormatter={(value) => `$${value}`}>
              <Label value="Revenue in USD" angle={-90} offset={-5} position="insideLeft" />
            </YAxis>
            <Tooltip />
            <Legend verticalAlign='top'/>
            <Line type="monotone" dataKey="Actual Revenue" dot={{strokeWidth :5}} stroke={palette.primary.main} />
            <Line type="monotone" dataKey="Regression Line" dot={false} stroke={palette.grey[500]}/>
            {isPredictions && <Line type="monotone" dataKey="Predicted Revenue" dot={{strokeWidth :5}} stroke={palette.secondary.main} strokeDasharray="5 5" />}
            <RechartsDevtools />
          </LineChart>
      </DashboardBox>
  )
}

export default Predictions;