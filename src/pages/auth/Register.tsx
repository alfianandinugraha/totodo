import ButtonForm from '@/components/ButtonForm'
import useTitlePage from '@/hooks/useTitlePage'
import firebase, {
  checkMaxLengthUserFullname,
  USERS_COLLECTION,
} from '@/utils/firebase'
import { Container, Typography, TextField } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FormLogin } from './Login'
import useStyles from './useStyles'

interface FormRegister extends FormLogin {
  repassword: HTMLInputElement
  fullname: HTMLInputElement
}

export default function Register(): ReactElement {
  useTitlePage('Register')
  const [isRegisterRequestLoading, setIsRegisterRequestLoading] = useState(
    false
  )
  const classes = useStyles()
  const history = useHistory()
  const [errorInputFullname, setErrorInputFullname] = useState<
    string | undefined
  >()

  const submitRegisterHandler = async (
    e: React.FormEvent<HTMLFormElement> | undefined
  ) => {
    if (!e) return
    e.preventDefault()

    const currentTarget: FormRegister = e.target as never

    const fullname = currentTarget.fullname.value
    const email = currentTarget.email.value
    const password = currentTarget.password.value
    const repassword = currentTarget.repassword.value

    if (!email || !password || !repassword || !fullname) {
      alert('Harap isi semua bidang')
      return
    }

    if (password !== repassword) {
      alert('Password tidak sama')
      return
    }

    const validateLengthFullname = checkMaxLengthUserFullname(fullname)

    if (!validateLengthFullname.isValid) {
      setErrorInputFullname(validateLengthFullname.message)
      return
    }

    console.log({ email, password, repassword, fullname })
    setIsRegisterRequestLoading(true)
    try {
      const authResult = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

      if (authResult.user) {
        await firebase
          .firestore()
          .collection(USERS_COLLECTION)
          .doc(authResult.user.uid)
          .set({
            fullname,
            email,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
            updatedAt: firebase.firestore.Timestamp.fromDate(new Date()),
          })
        setErrorInputFullname('')
      }
      history.push('/')
    } catch (err) {
      alert(`Pendaftaran gagal. Message : ${err.message}`)
    }
    setIsRegisterRequestLoading(false)
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" className={classes.header}>
        Register
      </Typography>
      <form onSubmit={submitRegisterHandler} className={classes.formRoot}>
        <div className={classes.input}>
          <TextField
            label="Fullname"
            name="fullname"
            type="text"
            fullWidth
            error={!!errorInputFullname}
            helperText={errorInputFullname}
          />
        </div>
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
        <div className={classes.input}>
          <TextField
            label="Re-Password"
            name="repassword"
            type="password"
            fullWidth
          />
        </div>
        <div className={classes.buttonGroup}>
          <ButtonForm
            variant="contained"
            color="primary"
            type="submit"
            isLoading={isRegisterRequestLoading}
          >
            Register
          </ButtonForm>
          <div className={classes.helperRedirect}>
            <Typography>Sudah memiliki akun ?&nbsp;</Typography>
            <Typography>
              <Link to="/login">Login</Link>
            </Typography>
          </div>
        </div>
      </form>
    </Container>
  )
}
