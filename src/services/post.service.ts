import axios from 'axios'

class PostService {
  fetchUserPosts(userId: number | null = null) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts`, { params: { userId }})
  }

  fetchInfo(id:number){
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
  }

  fetchComments(id:number){
    return axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
  }

  fetchPhotos(id:number){
    return axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`)
  }
}

export const postService = new PostService()