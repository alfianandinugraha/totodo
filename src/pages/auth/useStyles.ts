import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
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
    flexDirection: 'column',
    [breakpoints.up('sm')]: {
      alignItems: 'baseline',
      flexDirection: 'row',
    },
  },
  helperRedirect: {
    display: 'flex',
    marginTop: '1rem',
    alignItems: 'center',
    [breakpoints.up('sm')]: {
      marginTop: '0',
      marginLeft: '1rem',
    },
  },
}))

export default useStyles
