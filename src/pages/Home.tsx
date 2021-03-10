import AuthContext from '@/store/AuthContext'
import firebase from '@/utils/firebase'
import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import React, { ReactElement, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles(({ spacing }) => ({
  unAuthContent: {
    marginTop: spacing(3),
    marginBottom: spacing(3),
  },
  unAuthButtonGroup: {
    '& button': {
      marginRight: spacing(1),
      '& a': {
        textDecoration: 'none',
        color: 'inherit',
      },
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))

export default function Home(): ReactElement {
  const { isLoggedIn, setIsLoggedIn, userInfo } = useContext(AuthContext)
  const history = useHistory()
  const classes = useStyles()

  const signOutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoggedIn(false)
        history.push('/login')
      })
  }

  return (
    <Container maxWidth="sm">
      <div className={classes.header}>
        <Typography variant="h3">Totodo</Typography>
        {isLoggedIn && (
          <Button
            variant="contained"
            color="secondary"
            onClick={signOutHandler}
          >
            Keluar
          </Button>
        )}
      </div>
      <div>
        {userInfo.fullname && (
          <Typography>Selamat datang, {userInfo.fullname}</Typography>
        )}
      </div>
      {!isLoggedIn && (
        <>
          <div className={classes.unAuthContent}>
            <Typography>
              Anda belum login, silahkan login terlebih dahulu
            </Typography>
          </div>
          <div className={classes.unAuthButtonGroup}>
            <Button variant="contained" color="primary">
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="outlined" color="primary">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </>
      )}
    </Container>
  )
}
