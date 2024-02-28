<template>
  <p class="font-semibold text-2xl text-left mb-[15px]">{{ post?.title }}</p>

  <p class="text-sm font-normal">{{ post?.body }}</p>
</template>
<script lang="ts" setup>
import type{IPost} from '../../types/post.types'
defineProps<{
  post: IPost | null
}>()
</script>