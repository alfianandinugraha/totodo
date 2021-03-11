import {
  addTodoRequest,
  deleteTodoRequest,
  fetchTodosRequest,
  finishTodoRequest,
} from '@/api/TodosRequest'
import TodoCard, { TodoButtonType } from '@/components/TodoCard'
import { initialTodo } from '@/initial/Todos'
import AuthContext from '@/store/AuthContext'
import UserContext from '@/store/UserContext'
import firebase from '@/utils/firebase'
import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Todo, TodoBody } from 'Types'

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

export default function Home(): ReactElement {
  const { isLoggedIn, setIsLoggedIn, isAuthLoading } = useContext(AuthContext)
  const { userInfo, isUserInfoLoading } = useContext(UserContext)
  const [todos, setTodos] = useState<Todo[]>([])
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
    const todoBody: TodoBody = {
      description,
      todoId,
      uid,
      isFinish: false,
    }

    addTodoRequest(todoBody)
      .then((res) => {
        setTodos([
          { description, todoId, uid, isFinish: false, docId: res.id },
          ...todos,
        ])
        alert('Todo berhasil ditambahan')
      })
      .catch(() => alert('Todo gagal ditambahkan'))
  }

  const deleteTodoHandler = (todo: Todo) => {
    console.log('deleting todo...')
    console.log(todo)

    deleteTodoRequest(todo)
      .then(() => {
        setTodos(todos.filter((todoItem) => todoItem.todoId !== todo.todoId))
        console.log('Todo deleted !')
      })
      .catch(() => {
        console.log('gagal untuk menghapus todo')
      })
  }

  const finishTodo = (todo: Todo) => {
    console.log('finishing todo...')
    console.log(todo)
    finishTodoRequest(todo)
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todoState) => ({
            ...todoState,
            isFinish:
              todo.todoId === todoState.todoId
                ? !todoState.isFinish
                : todoState.isFinish,
          }))
        )
        console.log('Todo finished !')
      })
      .catch(() => {
        console.error('Gagal menyelesaikan todo...')
      })
  }

  const receiveButtonTodoCardHandler = (
    type: TodoButtonType,
    payload: Todo
  ) => {
    if (type === 'DELETE') deleteTodoHandler(payload)
    if (type === 'FINISH') finishTodo(payload)
  }

  useEffect(() => {
    if (isUserInfoLoading) return
    fetchTodosRequest(userInfo).then((val) => {
      console.log('fetching todos ...')
      const todosData = val.docs.map((item) => ({
        ...initialTodo,
        ...item.data(),
        docId: item.id,
      })) as Todo[]
      console.log(todosData)
      setTodos(todosData)
    })
  }, [isUserInfoLoading])

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
        {!isUserInfoLoading && (
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
                  disabled={isUserInfoLoading}
                >
                  Tambah Aktifitas
                </Button>
              </div>
            </form>
            <div className={classes.listTodoContainer}>
              {todos.length !== 0 &&
                todos.map((todo) => (
                  <TodoCard
                    payload={todo}
                    key={todo.todoId}
                    onButtonClick={receiveButtonTodoCardHandler}
                  />
                ))}
            </div>
          </>
        )}
      </div>
      {isAuthLoading && <Typography>Loading...</Typography>}
      {!isAuthLoading && !isLoggedIn && (
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
