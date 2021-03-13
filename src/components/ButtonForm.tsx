/* eslint-disable react/jsx-props-no-spreading */
import { Button, CircularProgress, ButtonProps } from '@material-ui/core'
import React, { ReactElement } from 'react'

interface Props extends ButtonProps {
  isLoading: boolean
  children: React.ReactNode
}

export default function ButtonForm({
  isLoading,
  children,
  ...props
}: Props): ReactElement {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading ? (
        <CircularProgress style={{ width: '24px', height: '24px' }} />
      ) : (
        <>{children}</>
      )}
    </Button>
  )
}
