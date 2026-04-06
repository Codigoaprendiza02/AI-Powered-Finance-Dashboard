import React from 'react'
import DashboardBox from '../../components/DashboardBox'

type Props = {}

const Row3 = (props: Props) => {
  return (
    <>
        <DashboardBox gridArea="g">G</DashboardBox>
        <DashboardBox gridArea="h">H</DashboardBox>
        <DashboardBox gridArea="i">I</DashboardBox>
        <DashboardBox gridArea="j">J</DashboardBox>
    </>
  )
}

export default Row3