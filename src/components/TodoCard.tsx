import { Button, ButtonGroup, makeStyles, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { Todo } from 'Types'

export type TodoButtonType = 'FINISH' | 'UPDATE' | 'DELETE'

interface TodoCardProps {
  payload: Todo
  onButtonClick: (type: TodoButtonType, payload: Todo) => void
}

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  root: {
    padding: spacing(2),
    border: '0.5px solid #BBBBBB',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: spacing(2),
    borderRadius: '5px',
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
}))

export default function TodoCard({
  payload,
  onButtonClick,
}: TodoCardProps): ReactElement {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography>
        {payload.isFinish ? <s>{payload.description}</s> : payload.description}
      </Typography>
      <div>
        <ButtonGroup>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onButtonClick('FINISH', payload)}
          >
            Finish
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onButtonClick('UPDATE', payload)}
          >
            Update
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
  )
}
