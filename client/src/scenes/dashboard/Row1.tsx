import React, { useMemo } from 'react'
import DashboardBox from '../../components/DashboardBox'
import { useGetKpisQuery } from '../../state/api';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useTheme } from '@mui/material';
import BoxHeader from '../../components/BoxHeader';

type Props = {}

const Row1 = (props: Props) => {
  const { palette }  = useTheme();
  const { data } = useGetKpisQuery();
  console.log("data:", data);

  const revenueExpenses = useMemo(() => {
    return (data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
      return {
        name : month.substring(0, 3), // Get the first three letters of the month
        revenue : revenue,
        expenses : expenses
      };
    }))
  }, [data]);
  const revenueProfit = useMemo(() => {
    return (data && data[0].monthlyData.map(({ month, revenue, expenses }) => {
      return {
        name : month.substring(0, 3), // Get the first three letters of the month
        revenue : revenue,
        profit: (revenue-expenses).toFixed(2) // Calculate profit and round to 2 decimal places
      };
    }))
  }, [data]);
  const revenueMonthByMonth = useMemo(() => {
    return (data && data[0].monthlyData.map(({ month, revenue }) => {
      return {
        name : month.substring(0, 3), // Get the first three letters of the month
        revenue : revenue// Calculate profit and round to 2 decimal places
      };
    }))
  }, [data]);
  return (
    <>
        <DashboardBox gridArea="a">
          <BoxHeader title="Revenue and Expenses" subtitle="Top line represents revenue, bottom line represents expenses" sideText="+4%" />
           <AreaChart
              style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
              responsive
              data={revenueExpenses}
              margin={{
                top: 20,
                right: 25,
                left: -10,
                bottom: 20,
              }}
              onContextMenu={(_, e) => e.preventDefault()}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={palette.primary.main} stopOpacity={0.5} />
                  <stop offset="95%" stopColor={palette.primary.main} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={palette.primary.main} stopOpacity={0.5} />
                  <stop offset="95%" stopColor={palette.primary.main} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              <XAxis dataKey="name" tickLine={false} style={{fontSize : "10px"}}/>
              <YAxis tickLine={false} axisLine={{strokeWidth : "0"}} style={{fontSize : "10px"}} domain={[8000, 23000]}/>
              <Tooltip />
              <Area type="monotone" dataKey="revenue" dot={true} stroke={palette.primary.main} fillOpacity={1} fill='url(#colorRevenue)' />
              <Area type="monotone" dataKey="expenses" dot={true} stroke={palette.primary.main} fillOpacity={1} fill='url(#colorExpenses)' />
              <RechartsDevtools />
            </AreaChart>
        </DashboardBox>
        <DashboardBox gridArea="b">
          <BoxHeader title="Revenue and Profit" subtitle="Top line represents revenue, bottom line represents Profit" sideText="+4%" />
           <LineChart
              style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
              responsive
              data={revenueProfit}
              margin={{
                top: 25,
                right: -5,
                left: 5,
                bottom: 20,
              }}
              onContextMenu={(_, e) => e.preventDefault()}
            >
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              <XAxis dataKey="name" tickLine={false} style={{fontSize : "10px"}}/>
              <YAxis yAxisId="left" tickLine={false} axisLine={false} style={{fontSize : "10px"}}/>
              <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{fontSize : "10px"}}/>
              <Tooltip />
              <Legend height={20} wrapperStyle={{
                margin: "0 0 10px 0",
              }}/>
              <Line yAxisId="left" type="monotone" dataKey="profit" dot={true} stroke={palette.secondary.main} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" dot={true} stroke={palette.primary.main} />
              <RechartsDevtools />
            </LineChart>
        </DashboardBox>
        <DashboardBox gridArea="c">
          <BoxHeader title="Revenue Month by Month" subtitle="Graph representing revenue month by month" sideText="+4%" />
          <BarChart
            style={{ width: '90%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={revenueMonthByMonth}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary.main} stopOpacity={0.8} />
                <stop offset="95%" stopColor={palette.primary.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} /> 
            <XAxis 
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{fontSize : "10px"}}
            />
            <YAxis axisLine={false} tickLine={false} style={{fontSize : "10px"}} />
            <Tooltip />
            {/* Legend removed as requested */}
            <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[10, 10, 0, 0]} />
            <RechartsDevtools />
          </BarChart>
        </DashboardBox>
    </>
  )
}

export default Row1