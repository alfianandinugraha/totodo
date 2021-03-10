import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({ spacing }) => ({
  formRoot: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    marginBottom: spacing(3),
  },
  input: {
    marginBottom: spacing(4),
    input: {
      width: '100%',
    },
  },
  buttonGroup: {
    display: 'flex',
  },
}))

export default useStyles
