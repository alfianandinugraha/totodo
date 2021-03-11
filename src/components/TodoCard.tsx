import { Button, ButtonGroup, makeStyles, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { Todo } from 'Types'

interface TodoCardProps {
  payload: Todo
  onClickDelete: (
    todoId: Todo,
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
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
  onClickDelete,
}: TodoCardProps): ReactElement {
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
          <Button
            variant="outlined"
            color="secondary"
            onClick={(e) => onClickDelete(payload, e)}
          >
            Delete
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
