import ButtonForm from '@/components/ButtonForm'
import useTitlePage from '@/hooks/useTitlePage'
import firebase from '@/utils/firebase'
import { Container, TextField, Typography } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import useStyles from './useStyles'

export interface FormLogin {
  email: HTMLInputElement
  password: HTMLInputElement
}

export default function Login(): ReactElement {
  useTitlePage('Login')
  const [isLoginRequestLoading, setIsLoginRequestLoading] = useState(false)
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
    setIsLoginRequestLoading(true)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoginRequestLoading(false)
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
          <ButtonForm
            variant="contained"
            color="primary"
            type="submit"
            isLoading={isLoginRequestLoading}
          >
            Login
          </ButtonForm>
          <div className={classes.helperRedirect}>
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
