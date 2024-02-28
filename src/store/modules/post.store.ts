import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { IPost } from '@/types/post.types'
import type { IComment } from '@/types/comment.types'
import { useDebounce } from '@vueuse/core'
import { postService } from '@/services/post.service'
import { setNotification } from '@/core/helpers/helper-functions'
import { UseGeneralStore } from '../modules/general.store'
import { storeToRefs } from 'pinia'

export const UsePostStore = defineStore('postStore', () => {
  const posts = ref<IPost[]>([])
  const postInfo = ref<IPost | null>(null)
  const postComments = ref<IComment[]>([])
  const selectedPost = ref<IPost | null>(null)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const pageSize = ref(5)
  const centerDialogVisible = ref(false)


  const generalStore = UseGeneralStore()
  const { loading } = storeToRefs(generalStore)
  const { truncateText } = UseGeneralStore()


  const fetchUserPosts = async (userId = null) => {
    loading.value = true
    try {
      const response = await postService.fetchUserPosts(userId)
      posts.value = response.data.map((post: IPost) => ({
        ...post,
        title: truncateText(post.title, 3),
        body: truncateText(post.body, 3)
      }))
    } catch (err) {
      setNotification('Failed to fetch posts', 'error')
    } finally {
      loading.value = false
    }
  }

  const openDialog = async (row: IPost) => {
    selectedPost.value = row
    centerDialogVisible.value = true

    try {
        const fetchedInfo = await postService.fetchInfo(selectedPost.value.id)
        const fetchedComments = await postService.fetchComments(selectedPost.value?.id)

        const photoResponse = await postService.fetchPhotos(selectedPost.value?.id);
        const photoData = await photoResponse.data;
        const photoUrl = photoData.url;

        const commentsWithImage = fetchedComments.data.map((comment: any) => ({
            ...comment,
            image: photoUrl
        }));

        postInfo.value = fetchedInfo.data;
        postComments.value = commentsWithImage;
    } catch (err) {
        setNotification('Failed to fetch comments', 'error');
    } finally {
        loading.value = false;
    }
}


  const debouncedSearchQuery = useDebounce(searchQuery, 2000)

  const filteredPosts = computed(() => {
    if (!debouncedSearchQuery.value) {
      return posts.value
    }

    return posts.value.filter(post => post.title.toLowerCase().includes(debouncedSearchQuery.value.toLowerCase()))
  })

  const paginatedPosts = computed(() => {
    const startIndex = (currentPage.value - 1) * pageSize.value
    const endIndex = startIndex + pageSize.value
    return filteredPosts.value.slice(startIndex, endIndex)
  })

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
    posts,
    postInfo,
    selectedPost,
    searchQuery,
    currentPage,
    pageSize,
    filteredPosts,
    paginatedPosts,
    postComments,
    centerDialogVisible,
    fetchUserPosts,
    openDialog,
    clearSearch,
    handleSizeChange,
    handleCurrentChange
  }
})
