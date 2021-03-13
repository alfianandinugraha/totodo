import { updateUserRequest } from '@/api/UserRequest'
import ButtonForm from '@/components/ButtonForm'
import HeaderDashboard from '@/components/HeaderDashboard'
import useTitlePage from '@/hooks/useTitlePage'
import UserContext from '@/store/UserContext'
import {
  checkMaxLengthUserFullname,
  getFirebaseTimestamp,
} from '@/utils/firebase'
import { Container, TextField, Typography, makeStyles } from '@material-ui/core'
import React, { ReactElement, useContext, useState } from 'react'
import { User } from 'Types'

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
  useTitlePage('Profile')
  const { userInfo, setUserInfo } = useContext(UserContext)
  const [isRequestUpdateLoading, setIsRequestUpdateLoading] = useState(false)
  const [errorInputFullname, setErrorInputFullname] = useState<
    string | undefined
  >()
  const classes = useStyles()

  const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target: FormUpdateProfile = e.target as never
    const fullname = target.fullname.value

    if (fullname === userInfo.fullname) return

    if (!fullname) {
      alert('nama tidak boleh kosong')
      return
    }

    const validateLengthFullname = checkMaxLengthUserFullname(fullname)

    if (!validateLengthFullname.isValid) {
      setErrorInputFullname(validateLengthFullname.message)
      return
    }

    const newUserInfo: User = {
      ...userInfo,
      fullname,
      updatedAt: getFirebaseTimestamp(),
    }

    setIsRequestUpdateLoading(true)
    updateUserRequest(newUserInfo)
      .then(() => {
        setUserInfo(newUserInfo)
        setErrorInputFullname('')
        alert('Nama berhasil di perbaharui')
      })
      .catch(() => {
        alert('Update nama gagal')
      })
      .finally(() => {
        setIsRequestUpdateLoading(false)
      })
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
            error={!!errorInputFullname}
            helperText={errorInputFullname}
          />
          <ButtonForm
            variant="contained"
            color="primary"
            type="submit"
            isLoading={isRequestUpdateLoading}
          >
            Update
          </ButtonForm>
        </form>
      )}
    </Container>
  )
}
