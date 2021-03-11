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

interface FormUpdateProfile {
  fullname: HTMLInputElement
}

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

  const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target: FormUpdateProfile = e.target as never
    const fullname = target.fullname.value

    console.log(fullname)
  }

  return (
    <Container maxWidth="sm">
      <HeaderDashboard />
      <Typography>Update Profile</Typography>
      {userInfo.fullname && (
        <form className={classes.formUpdate} onSubmit={submitFormHandler}>
          <TextField
            label="Fullname"
            defaultValue={userInfo.fullname}
            name="fullname"
          />
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </form>
      )}
    </Container>
  )
}
