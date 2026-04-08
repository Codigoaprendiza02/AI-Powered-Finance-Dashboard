import React, { useMemo } from 'react'
import DashboardBox from '../../components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery } from '../../state/api'
import BoxHeader from '../../components/BoxHeader'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts'
import { RechartsDevtools } from '@recharts/devtools'
import { Box, Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'

const pieData = [
  { name: 'Group A', value: 600 },
  { name: 'Group B', value: 400 },
];

const isAnimationActive = true;

const Row2 = () => {
  const { palette }  = useTheme();
  const {data : operationalData } = useGetKpisQuery();
  const pieColors = [palette.primary.main, palette.secondary.main];
  const {data : productExpensesData} = useGetProductsQuery();
  const operationalExpenses = useMemo(() => {
      return (operationalData && operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
        return {
          name : month.substring(0, 3), // Get the first three letters of the month
          "Operational Expenses" : operationalExpenses,
          "Non-Operational Expenses" : nonOperationalExpenses
        };
      }))
    }, [operationalData]);
  const productExpenses = useMemo(() => {
    return (productExpensesData && productExpensesData.map(({ _id, price, expense }) => {
      return {
        id : _id, // Get the first three letters of the month
        price : price,
        expense : expense
      };
    }))
  }, [productExpensesData]);
  // const productExpenses = useMemo(() => {
  //   if (!productExpensesData) return [];
  //   return productExpensesData.map(({ _id, price, expense }) => {
  //     const parseValue = (val: string | number) => {
  //       if (typeof val === 'number' && !isNaN(val)) return val;
  //       if (typeof val === 'string') {
  //         const num = Number(val.replace(/[^0-9.-]+/g, ""));
  //         return isNaN(num) ? null : num;
  //       }
  //       return null;
  //     };
  //     return {
  //       id: _id,
  //       price: parseValue(price),
  //       expense: parseValue(expense),
  //     };
  //   });
  // }, [productExpensesData]);
  console.log("productExpenses", productExpenses);
  return (
    <>
        <DashboardBox gridArea="d">
          <BoxHeader title="Operational and Non Operational costs" subtitle="Top line represents revenue, bottom line represents Profit" sideText="+4%" />
            <ResponsiveContainer height={165} width="100%">
              <LineChart
                data={operationalExpenses}
                margin={{
                  top: 13,
                  right: -5,
                  left: 5,
                  bottom: 5,
                }}
                onContextMenu={(_, e) => e.preventDefault()}
              >
                <CartesianGrid vertical={false} stroke={palette.grey[800]} />
                <XAxis dataKey="name" tickLine={false} style={{fontSize : "10px"}}/>
                <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={false} style={{fontSize : "10px"}}/>
                <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{fontSize : "10px"}}/>
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="Non-Operational Expenses" dot={true} stroke={palette.secondary.main} />
                <Line yAxisId="right" type="monotone" dataKey="Operational Expenses" dot={true} stroke={palette.primary.main} />
                <RechartsDevtools />
              </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
<DashboardBox gridArea="e">
        <BoxHeader title="Campaigns and Targets" sideText="+4%" subtitle={''} />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={30}
              outerRadius={35}
              cornerRadius={10}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary.main}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      
      <DashboardBox gridArea="f">
        <BoxHeader title="Product Prices and Expenses" sideText="+4%" subtitle={''} />
        <ResponsiveContainer height="100%" width="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 30,
            left: -10,
          }}
        >
          <CartesianGrid stroke={palette.grey[800]} />
          <XAxis 
            type="number" 
            dataKey="price" 
            name="price" 
            axisLine={false} 
            tickLine={false} 
            style={{fontSize : "10px"}} 
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            type="number" 
            dataKey="expense" 
            name="expense" 
            axisLine={false} 
            tickLine={false} 
            style={{fontSize : "10px"}} 
            tickFormatter={(value) => `$${value}`}
          />  
          <ZAxis type="number" range={[0,20]} />
          {/* <YAxis type="number" dataKey="y" name="weight" unit="kg" width="auto" /> */}
          <Tooltip formatter={(value) => `$${value}`} />
          <Scatter
            name="Product expense Ratio"
            data={productExpenses}
            fill={palette.primary.main}
            stroke={palette.primary.main}
            shape={(props) => (
              <circle
                {...props}
                r={4} // Set your desired radius here
                fill={palette.primary.main}
                stroke={palette.primary.main}
              />
            )}
          />
          <RechartsDevtools />
        </ScatterChart>
      </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row2