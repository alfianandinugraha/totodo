import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'

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
}))

export default function Home(): ReactElement {
  const classes = useStyles()
  return (
    <Container maxWidth="sm">
      <Typography variant="h3">Totodo</Typography>
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
    </Container>
  )
}
