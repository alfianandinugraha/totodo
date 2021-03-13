import { useEffect } from 'react'

const useTitlePage = (title: string): void => {
  useEffect(() => {
    document.title = title
  }, [title])
}

export default useTitlePage
