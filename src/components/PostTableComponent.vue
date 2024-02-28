<template>
  <div class="w-[769px]">

    <AppTable v-if="filteredPosts.length > 0" :columns="postColumns" :data="paginatedPosts" @rowClick="openDialog" />

    <el-empty v-else description="No matching posts found" />
    <PaginationComponent/>
  </div>
</template>

<script setup lang="ts">
import AppTable from '@/components/shared/AppTable.vue'
import { storeToRefs } from 'pinia'
import { UsePostStore } from '../store/modules/post.store'
import {postColumns} from '../core/utils'
import PaginationComponent from './shared/PaginationComponent.vue';


const postStore = UsePostStore()

const { filteredPosts, paginatedPosts} = storeToRefs(postStore)
const { openDialog } = UsePostStore()

</script>

