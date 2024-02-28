import { defineStore } from 'pinia'
import { ref } from 'vue'
import { UsePostStore } from '../modules/post.store'
import { storeToRefs } from 'pinia'


export const UseGeneralStore = defineStore('generalStore', () => {
  const loading = ref(false)

  const postStore = UsePostStore()
  const { searchQuery,currentPage, pageSize } = storeToRefs(postStore)
  const { fetchUserPosts } = UsePostStore()



  const truncateText = (text: string, maxLength: number) => {
    const words = text.split(' ')
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(' ') + '...'
    }
    return text
  }

  const clearSearch = () => {
    searchQuery.value = ''
  }

  const handleSizeChange = (size: number) => {
    currentPage.value = 1
    pageSize.value = size
  }

  const handleCurrentChange = (page: number) => {
    currentPage.value = page
  }

  return {
    loading,
    fetchUserPosts,
    truncateText,
    clearSearch,
    handleSizeChange,
    handleCurrentChange
  }
})
