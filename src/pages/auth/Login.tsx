import firebase from '@/utils/firebase'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { Link, useHistory } from 'react-router-dom'
import useStyles from './useStyles'

export interface FormLogin {
  email: HTMLInputElement
  password: HTMLInputElement
}

export default function Login(): ReactElement {
  const history = useHistory()
  const classes = useStyles()

  const submitLoginHandler = (
    e: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    if (!e) return
    e.preventDefault()

    const currentTarget: FormLogin = e.target as never

    const email = currentTarget.email.value
    const password = currentTarget.password.value

    if (!email || !password) {
      alert('Harap isi semua bidang')
      return
    }

    console.log({ email, password })
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user)
        alert('Login berhasil !')
        history.push('/')
      })
      .catch((err) => {
        console.log(err)
        alert(`Login gagal. Message : ${err.message}`)
      })
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" className={classes.header}>
        Login
      </Typography>
      <form onSubmit={submitLoginHandler} className={classes.formRoot}>
        <div className={classes.input}>
          <TextField label="Email" name="email" type="email" fullWidth />
        </div>
        <div className={classes.input}>
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
          />
        </div>
        <div className={classes.buttonGroup}>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <div
            style={{
              display: 'flex',
              marginLeft: '1rem',
              alignItems: 'center',
            }}
          >
            <Typography>Belum memiliki akun ?&nbsp;</Typography>
            <Typography>
              <Link to="/register">Register</Link>
            </Typography>
          </div>
        </div>
      </form>
    </Container>
  )
}
