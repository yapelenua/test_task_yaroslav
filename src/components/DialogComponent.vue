<template>
  <el-dialog
    v-model="centerDialogVisible"
    alignCenter
    class="mx-auto !p-[25px] !rounded-xl"
    @close="centerDialogVisible = false"
  >
    <template #header>
      <PostInfoComponent :post="postInfo" />
    </template>
    <div v-loading="loading" class="max-h-[300px] overflow-auto">
      <p class="text-lg font-medium mb-[15px]">Comments</p>

      <template v-if="postComments.length > 0">
        <CommentComponent v-for="comment in postComments" :comment="comment" :key="comment.id" />
      </template>
      <template v-else>
        <el-empty description="No comments available" />
      </template>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { UsePostStore } from '../../src/store/modules/post.store'
import { UseGeneralStore } from '../../src/store/modules/general.store'
import PostInfoComponent from './shared/PostInfoComponent.vue'
import CommentComponent from './shared/CommentComponent.vue'

const generalStore = UseGeneralStore()
const postStore = UsePostStore()

const { loading } = storeToRefs(generalStore)
const { postInfo, postComments, centerDialogVisible } = storeToRefs(postStore)
</script>
