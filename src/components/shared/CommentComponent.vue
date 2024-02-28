<template>
  <div class="mb-2 border-b border-gray-300 pb-2 rounded-xl shadow-md p-[10px]">
    <UserBadge :comment="comment"/>
    <p>{{ comment.body }}</p>
  </div>
</template>
<script lang="ts" setup>
import UserBadge from '../shared/UserBadge.vue'
import type { IComment } from '../../types/comment.types'

defineProps<{
  comment: IComment
}>()
</script>