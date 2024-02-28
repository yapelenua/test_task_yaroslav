import type {IPost} from './post.types'
import type {IUser} from './user.types'



export type TNotification = 'error' | 'success' | 'warning' | 'info'

export interface  IColumns {
  prop: string
  label: string
  width?: string
  type?: string
}

export type TData = IUser[] | IPost[] 