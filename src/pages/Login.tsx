import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

interface FormLogin {
  email: HTMLInputElement
  password: HTMLInputElement
}

const useStyles = makeStyles(({ spacing }) => ({
  formRoot: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    marginBottom: spacing(3),
  },
  input: {
    marginBottom: spacing(4),
    input: {
      width: '100%',
    },
  },
  buttonGroup: {
    display: 'flex',
  },
}))

export default function Login(): ReactElement {
  const classes = useStyles()

  const submitLoginHandler = (
    e: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    if (!e) return
    e.preventDefault()

    const currentTarget: FormLogin = e.target as never

    const email = currentTarget.email.value
    const password = currentTarget.password.value

    console.log({ email, password })
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
