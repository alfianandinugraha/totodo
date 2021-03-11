import HeaderDashboard from '@/components/HeaderDashboard'
import UserContext from '@/store/UserContext'
import {
  Container,
  TextField,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core'
import React, { ReactElement, useContext } from 'react'

const useStyles = makeStyles(({ spacing }) => ({
  formUpdate: {
    marginTop: spacing(3),
    display: 'flex',
    flexDirection: 'column',
    '& > button': {
      marginTop: spacing(3),
    },
  },
}))

export default function ProfilePage(): ReactElement {
  const { userInfo } = useContext(UserContext)
  const classes = useStyles()

  return (
    <Container maxWidth="sm">
      <HeaderDashboard />
      <Typography>Update Profile</Typography>
      <form className={classes.formUpdate}>
        <TextField label="Fullname" defaultValue={userInfo.fullname} />
        <Button variant="contained" color="primary">
          Update
        </Button>
      </form>
    </Container>
  )
}
