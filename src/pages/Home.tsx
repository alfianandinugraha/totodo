import {
  addTodoRequest,
  deleteTodoRequest,
  fetchTodosRequest,
  finishTodoRequest,
  updateTodoRequest,
} from '@/api/TodosRequest'
import ButtonForm from '@/components/ButtonForm'
import HeaderDashboard from '@/components/HeaderDashboard'
import TodoCard, { TodoButtonType } from '@/components/TodoCard'
import useTitlePage from '@/hooks/useTitlePage'
import { initialTodo } from '@/initial/Todos'
import AuthContext from '@/store/AuthContext'
import UserContext from '@/store/UserContext'
import {
  checkMaxLengthTodoDescrition,
  getFirebaseTimestamp,
} from '@/utils/firebase'
import {
  Container,
  makeStyles,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
    display: 'flex',
    flexDirection: 'column',
  },
}))

export default function Home(): ReactElement {
  useTitlePage('Totodo - Catat aktifitas mu !')
  const { isLoggedIn, isAuthLoading } = useContext(AuthContext)
  const { userInfo, isUserInfoLoading } = useContext(UserContext)
  const [isAddTodoRequestLoading, setIsAddTodoRequestLoading] = useState(false)
  const [isFetchTodoLoading, setIsFetchTodoLoading] = useState(true)
  const [errorInputTodoMessage, setErrorInputTodoMessage] = useState<
    string | undefined
  >()
  const [todos, setTodos] = useState<Todo[]>([])
  const classes = useStyles()

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

    const validateLengthDescription = checkMaxLengthTodoDescrition(description)

    if (!validateLengthDescription.isValid) {
      setErrorInputTodoMessage(validateLengthDescription.message)
      return
    }

    console.log({ description, todoId, uid })
    const firebaseTimestamp = getFirebaseTimestamp()
    const todoBody: TodoBody = {
      description,
      todoId,
      uid,
      isFinish: false,
      createdAt: firebaseTimestamp,
      updatedAt: firebaseTimestamp,
    }
    setIsAddTodoRequestLoading(true)
    addTodoRequest(todoBody)
      .then((res) => {
        setTodos([{ ...todoBody, docId: res.id }, ...todos])
        setErrorInputTodoMessage('')
        currentTarget.description.value = ''
      })
      .catch(() => alert('Todo gagal ditambahkan'))
      .finally(() => setIsAddTodoRequestLoading(false))
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

  const updateTodo = (todo: Todo) => {
    console.log('updating todo...')
    console.log(todo)
    updateTodoRequest(todo).then(() => {
      console.log('todo updated !')
      setTodos((prevTodos) =>
        prevTodos.map((todoItem) =>
          todoItem.docId === todo.docId ? todo : todoItem
        )
      )
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
    if (type === 'UPDATE') updateTodo(payload)
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
      setIsFetchTodoLoading(false)
    })
  }, [isUserInfoLoading])

  return (
    <Container maxWidth="sm">
      <HeaderDashboard />
      <div>
        {!isUserInfoLoading && (
          <Typography>
            Selamat datang, {userInfo.fullname} (
            <Link to="/profile">update</Link>)
          </Typography>
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
                  error={!!errorInputTodoMessage}
                  helperText={errorInputTodoMessage}
                  fullWidth
                />
              </div>
              <div>
                <ButtonForm
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  isLoading={isUserInfoLoading || isAddTodoRequestLoading}
                >
                  Tambah Aktifitas
                </ButtonForm>
              </div>
            </form>
            <div className={classes.listTodoContainer}>
              {isFetchTodoLoading && (
                <CircularProgress style={{ margin: '0 auto' }} />
              )}
              {todos.length === 0 && !isFetchTodoLoading && (
                <Typography align="center">Tidak ada aktifitas</Typography>
              )}
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
