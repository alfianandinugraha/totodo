import TodoCard, { Todo } from '@/components/TodoCard'
import AuthContext from '@/store/AuthContext'
import firebase from '@/utils/firebase'
import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { ReactElement, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

interface FormTodo {
  description: HTMLInputElement
}

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
  formTodo: {
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      width: '100%',
    },
  },
  formInputTodo: {
    marginBottom: spacing(3),
    marginTop: spacing(3),
  },
  listTodoContainer: {
    marginTop: spacing(3),
  },
}))

const initialTodos: Todo[] = [
  {
    uid: '2EI1nKMDDlSsHcmUSq05RWUIawt2',
    description: 'hello',
    todoId: '1023098123',
  },
  {
    uid: '2EI1nKMDDlSsHcmUSq05RWUIawt2',
    description: 'hello',
    todoId: '1023098124',
  },
  {
    uid: '2EI1nKMDDlSsHcmUSq05RWUIawt2',
    description: 'hello',
    todoId: '1023098125',
  },
]

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

  const addTodoHandler = (e: React.FormEvent<HTMLFormElement> | undefined) => {
    if (!e) return
    e.preventDefault()

    const currentTarget: FormTodo = e.target as never

    const description = currentTarget.description.value
    const todoId = new Date().getTime().toString()
    const { uid } = userInfo

    if (!description) {
      alert('Harap isi aktifitas')
      return
    }

    console.log({ description, todoId, uid })
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
      <div>
        {isLoggedIn && (
          <>
            <form className={classes.formTodo} onSubmit={addTodoHandler}>
              <div className={classes.formInputTodo}>
                <TextField
                  type="text"
                  name="description"
                  label="Deskripsi"
                  placeholder="Makan seblak"
                  fullWidth
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Tambah Aktifitas
                </Button>
              </div>
            </form>
            <div className={classes.listTodoContainer}>
              {initialTodos.map((todo) => (
                <TodoCard payload={todo} key={todo.todoId} />
              ))}
            </div>
          </>
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
