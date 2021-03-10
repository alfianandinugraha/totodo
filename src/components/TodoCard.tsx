import { Button, ButtonGroup, makeStyles, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'

export interface Todo {
  todoId: string
  description: string
  uid: string
}

interface TodoCardProps {
  payload: Todo
}

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  root: {
    padding: spacing(2),
    border: '0.5px solid #BBBBBB',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: spacing(2),
    borderRadius: '5px',
    [breakpoints.up('sm')]: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      '& > p': {
        marginBottom: '0px',
      },
    },
    '& > p': {
      marginBottom: spacing(1),
    },
  },
}))

export default function TodoCard({ payload }: TodoCardProps): ReactElement {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography>{payload.description}</Typography>
      <div>
        <ButtonGroup>
          <Button variant="outlined" color="primary">
            Finish
          </Button>
          <Button variant="outlined" color="primary">
            Update
          </Button>
          <Button variant="outlined" color="secondary">
            Delete
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
