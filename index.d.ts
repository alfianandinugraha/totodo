declare module 'Types' {
  export interface User {
    uid: string
    fullname: string
    email: string
  }

  export interface AuthContextProps {
    userInfo: User
    isUserInfoLoading: boolean
    setUserInfo: (user: User) => void
    setIsUserInfoLoading: (status: boolean) => void
  }
}
