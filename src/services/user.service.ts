import axios from 'axios'

class UserService {
  fetchUsers() {
      return axios.get(`https://jsonplaceholder.typicode.com/users`)
  }
}

export const userService = new UserService()
