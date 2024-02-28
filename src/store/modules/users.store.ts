import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IUser } from '@/types/user.types'
import type { IPost } from '@/types/post.types'
import { UseGeneralStore } from '../modules/general.store'
import { UsePostStore } from '../modules/post.store'
import { userService } from '@/services/user.service'
import { postService } from '@/services/post.service'

import { setNotification } from '@/core/helpers/helper-functions'
import { storeToRefs } from 'pinia'


export const UseUserStore = defineStore('userStore', () => {
  const users = ref<IUser[]>([])
  const parentBorder = ref(true)
  const selectedUser = ref<IUser | null>(null)
  const selectedPost = ref<IPost | null>(null)

  const generalStore = UseGeneralStore()
  const postStore = UsePostStore()

  const { loading } = storeToRefs(generalStore)
  const { truncateText } = UseGeneralStore()
  const { posts } = storeToRefs(postStore)

  const fetchUsersPosts = async (userId: number | null = null) => {
    loading.value = true
    try {
      const response = await postService.fetchUserPosts(userId)
  
      users.value = users.value.map((e) => {
        return {
          ...e,
          posts: response.data.filter((post: IPost) => post.userId === e.id)
        }
      }) as IUser[]
  
      posts.value = response.data.map((post: IPost) => ({
        ...post,
        title: truncateText(post.title, 4),
        body: truncateText(post.body, 4)
      }))
    } catch (err) {
      setNotification('Failed to fetch posts', 'error')
    } finally {
      loading.value = false
    }
  }
  
  
  


  const fetchUsers = async () => {
    loading.value = true
    try {
      const response = await userService.fetchUsers()
      const fetchedUsers = response.data

      users.value = fetchedUsers
    } catch (err) {
      setNotification('Failed to fetch users', 'error')
    } finally {
      loading.value = false
    }
  }

  const selectUser = (user: IUser) => {
    selectedUser.value = user
  }


  return {
    users,
    parentBorder,
    selectedUser,
    selectedPost,
    selectUser,
    fetchUsers,
    fetchUsersPosts,
  }
})
