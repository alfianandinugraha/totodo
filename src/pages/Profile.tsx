import HeaderDashboard from '@/components/HeaderDashboard'
import { Container, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'

export default function ProfilePage(): ReactElement {
  return (
    <Container maxWidth="sm">
      <HeaderDashboard />
      <Typography>Update Profile</Typography>
    </Container>
  )
}
