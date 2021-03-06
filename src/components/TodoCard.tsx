import { checkMaxLengthTodoDescrition } from '@/utils/firebase'
import {
  Button,
  ButtonGroup,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { Todo } from 'Types'

export type TodoButtonType = 'FINISH' | 'UPDATE' | 'DELETE'

interface TodoCardProps {
  payload: Todo
  onButtonClick: (type: TodoButtonType, payload: Todo) => void
}

interface UpdateForm {
  description: HTMLInputElement
}

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  root: {
    padding: spacing(2),
    border: '0.5px solid #BBBBBB',
    marginBottom: spacing(2),
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    '& > p': {
      marginBottom: spacing(1),
    },
    [breakpoints.up('sm')]: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      '& > p': {
        marginBottom: '0px',
      },
    },
  },
  formUpdate: {
    display: 'flex',
    '& > button': {
      marginLeft: spacing(1),
    },
  },
  formUpdateWrapper: {
    marginTop: spacing(3),
  },
}))

function TodoCard({ payload, onButtonClick }: TodoCardProps): ReactElement {
  const [isFormUpdateShow, setIsFormUpdateShow] = useState(false)
  const [errorInputTodoMessage, setErrorInputTodoMessage] = useState<
    string | undefined
  >()
  const classes = useStyles()

  const formUpdateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target: UpdateForm = e.target as never
    const newDescription = target.description.value
    const validateLengthDescription = checkMaxLengthTodoDescrition(
      newDescription
    )

    if (!validateLengthDescription.isValid) {
      setErrorInputTodoMessage(validateLengthDescription.message)
      return
    }

    if (newDescription === payload.description) return
    onButtonClick('UPDATE', {
      ...payload,
      description: newDescription,
    })
    setErrorInputTodoMessage('')
    setIsFormUpdateShow(false)
    console.log(newDescription)
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography
          style={{
            color: payload.isFinish ? '#BBBBBB' : 'inherit',
          }}
        >
          {payload.isFinish ? (
            <s>{payload.description}</s>
          ) : (
            payload.description
          )}
        </Typography>
        <div>
          <ButtonGroup>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onButtonClick('FINISH', payload)}
            >
              {payload.isFinish ? 'Unfinish' : 'Finish'}
            </Button>
            <Button
              variant="outlined"
              color={isFormUpdateShow ? 'secondary' : 'primary'}
              onClick={() => {
                setIsFormUpdateShow(!isFormUpdateShow)
                setErrorInputTodoMessage('')
              }}
            >
              {isFormUpdateShow ? 'Close' : 'Update'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onButtonClick('DELETE', payload)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </div>
      </div>
      {isFormUpdateShow && (
        <div className={classes.formUpdateWrapper}>
          <form className={classes.formUpdate} onSubmit={formUpdateHandler}>
            <TextField
              fullWidth
              defaultValue={payload.description}
              name="description"
              error={!!errorInputTodoMessage}
              helperText={errorInputTodoMessage}
            />
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </form>
        </div>
      )}
    </div>
  )
}

export default React.memo(TodoCard)
