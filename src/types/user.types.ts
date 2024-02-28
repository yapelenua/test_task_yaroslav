import type {IPost} from './post.types'

export interface IUser {
  id: number;
  name: string;
  posts: IPost[];
}