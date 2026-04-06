import React from 'react'
import DashboardBox from '../../components/DashboardBox'
import { useGetKpisQuery } from '../../state/api';

type Props = {}

const Row1 = (props: Props) => {
  const { data } = useGetKpisQuery();
  return (
    <>
        <DashboardBox gridArea="a">A</DashboardBox>
        <DashboardBox gridArea="b">B</DashboardBox>
        <DashboardBox gridArea="c">C</DashboardBox>
    </>
  )
}

export default Row1