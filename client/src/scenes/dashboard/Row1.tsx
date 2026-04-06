import React from 'react'
import DashboardBox from '../../components/DashboardBox'

type Props = {}

const Row1 = (props: Props) => {
  return (
    <>
        <DashboardBox gridArea="a">A</DashboardBox>
        <DashboardBox gridArea="b">B</DashboardBox>
        <DashboardBox gridArea="c">C</DashboardBox>
    </>
  )
}

export default Row1