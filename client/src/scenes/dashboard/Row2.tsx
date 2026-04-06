import React from 'react'
import DashboardBox from '../../components/DashboardBox'

type Props = {}

const Row2 = (props: Props) => {
  return (
    <>
        <DashboardBox gridArea="d">D</DashboardBox>
        <DashboardBox gridArea="e">E</DashboardBox>
        <DashboardBox gridArea="f">F</DashboardBox>
    </>
  )
}

export default Row2