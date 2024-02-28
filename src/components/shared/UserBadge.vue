<template>
  <div class="flex mb-[5px] items-center">
    <el-avatar
        :src='comment.image'
      />

    <p class="ml-[10px]">{{ comment.email }}</p>
  </div>
</template>
<script lang="ts" setup>
import type {IComment} from '../../types/comment.types'

defineProps<{
  comment: IComment
}>()
</script>