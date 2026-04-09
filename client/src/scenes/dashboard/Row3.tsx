import React, { useMemo } from 'react'
import DashboardBox from '../../components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '../../state/api';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import BoxHeader from '../../components/BoxHeader';
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
import type { GridCellParams } from '@mui/x-data-grid';
import FlexBetween from '../../components/FlexBetween';
import { Cell, Pie, PieChart } from 'recharts';

type Props = {}

const Row3 = (props: Props) => {
  const { palette } = useTheme();
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data : transactionData} = useGetTransactionsQuery();
  console.log("transactionData", transactionData);
  const productColumns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "expense", headerName: "Expense", flex: 0.5, renderCell: (params: GridCellParams) => `$${params.value}` },
    { field: "price", headerName: "Price", flex: 0.5, renderCell: (params: GridCellParams) => `$${params.value}` },
  ];
  const transactionColumns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "buyer", headerName: "Buyer", flex: 0.67},
    { field: "amount", headerName: "Amount", flex: 0.5, renderCell: (params: GridCellParams) => `$${params.value}` },
    { field: "productIds", headerName: "Count", flex: 0.5, renderCell: (params: GridCellParams) => `${(params.value as Array<string>).length}` },
  ];
  const pieColors = [palette.primary.main, palette.secondary.main];
  const pieChartData = useMemo(() => {
    if (kpiData) {
      // Parse totalExpenses to number (remove $ and commas)
      const totalExpenses = Number(String(kpiData[0].totalExpenses).replace(/[$,]/g, ""));
      return Object.entries(kpiData[0].expensesByCategory)
        .filter(([key, value]) => key && value && !isNaN(Number(String(value).replace(/[$,]/g, ""))))
        .map(([key, value]: [string, string | number]) => {
          const numValue = Number(String(value).replace(/[$,]/g, ""));
          return [
            { name: key, value: numValue },
            { name: `${key} of Total`, value: totalExpenses - numValue }
          ];
        });
    }
  }, [kpiData]);

  return (
    <>
        <DashboardBox gridArea="g">
          <BoxHeader 
            title="List of Products"
            subtitle=''
            sideText={`${productData?.length} Total`}
          />
          <Box mt="0.5rem" p="0 0.5rem" height="75%" 
          sx={
            { 
              "& .MuiDataGrid-root": { 
                // color: palette.grey[300],
                border: "none" ,
                backgroundColor: "#1f2026",
                fontSize: "10px"
              }, 
              "& .MuiDataGrid-cell": { 
                borderBottom: `0.5px solid ${palette.grey[900]} !important`,
                backgroundColor: "#2b2b30",
                color: palette.secondary.main,
              } ,
              "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader": { 
                borderBottom: `0.5px solid ${palette.grey[900]} !important`,
                backgroundColor: "#2b2b30",
                border: `none !important`,
                color: palette.primary.main,
                fontSize: "10px"
              },
              "& .MuiDataGrid-topContainer": {
                backgroundColor: "#2b2b30",
              },
              "&. MuiDataGrid-columnSeparator" : {
                "visibility" : "hidden",
              }, 
              "& .MuiDataGrid-virtualScroller": { 
                backgroundColor: "#2b2b30"
              },  
              // "& .MuiDataGrid-footerContainer": { 
              //   borderTop: "none", backgroundColor: palette.grey[800] , color: palette.grey[800]
              // }
            }
          }>
          <DataGrid columnHeaderHeight={25} rowHeight={35} hideFooter={true}columns={productColumns} rows={productData || []} />
          </Box>
        </DashboardBox>
        <DashboardBox gridArea="h">
          <BoxHeader 
            title="Recent Orders"
            subtitle=''
            sideText={`${transactionData?.length} Total`}
          />
          <Box mt="1rem" p="0 0.5rem" height="80%" 
          sx={
            { 
              "& .MuiDataGrid-root": { 
                color: palette.grey[300],
                border: "none" ,
                backgroundColor: "#1f2026",
                fontSize: "10px"
              }, 
              "& .MuiDataGrid-cell": { 
                borderBottom: `0.5px solid ${palette.grey[900]} !important`,
                backgroundColor: "#2b2b30",
                // color: palette.secondary.main,
              } ,
              "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader": { 
                borderBottom: `0.5px solid ${palette.grey[900]} !important`,
                backgroundColor: "#2b2b30",
                border: `none !important`,
                color: palette.primary.main,
                fontSize: "10px"
              },
              "& .MuiDataGrid-topContainer": {
                backgroundColor: "#2b2b30",
              },
              "&. MuiDataGrid-columnSeparator" : {
                "visibility" : "hidden",
              }, 
              "& .MuiDataGrid-virtualScroller": { 
                backgroundColor: "#2b2b30"
              },  
              // "& .MuiDataGrid-footerContainer": { 
              //   borderTop: "none", backgroundColor: palette.grey[800] , color: palette.grey[800]
              // }
            }
          }>
          <DataGrid columnHeaderHeight={25} rowHeight={35} hideFooter={true}columns={transactionColumns} rows={transactionData || []} />
          </Box>
        </DashboardBox>
        <DashboardBox gridArea="i">
          <BoxHeader title="Expense Breakdown by Category" sideText="+4%" subtitle={''} />
        <FlexBetween mt="0.25rem" gap="1rem" pr="0.5rem">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`} display="flex" flexDirection="column" alignItems="center">
              <PieChart
                width={70}
                height={60}
              >
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={12}
                  outerRadius={18}
                  cornerRadius={8}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((_entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h6" mt={0.05} align="center">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
        </DashboardBox>
        <DashboardBox gridArea="j">
          <BoxHeader title="Overall summary and Explaination Data" sideText="+15%" subtitle={''} />
          <Box
            height="15px"
            margin="1.25rem 1rem 0.4rem 1rem"
            bgcolor={palette.primary.main}
            borderRadius="1rem"
          >
            <Box 
            height="15px"
            bgcolor={palette.primary.main}
            borderRadius="1rem"
            width="40%"
          >
          </Box>
          </Box>
          <Typography margin="0 1rem" variant="h6" align="center">
            The dashboard provides a comprehensive overview of the financial performance of the company, including key metrics such as total profit, revenue, and expenses. 
          </Typography>
        </DashboardBox>
    </>
  )
}

export default Row3