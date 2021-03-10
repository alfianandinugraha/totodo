import React, { ReactElement } from 'react'

export interface Todo {
  todoId: string
  description: string
  uid: string
}

interface TodoCardProps {
  payload: Todo
}

export default function TodoCard({ payload }: TodoCardProps): ReactElement {
  return <div />
}
