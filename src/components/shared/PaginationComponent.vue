<template>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="w-full mt-10"
      :current-page="currentPage"
      :page-sizes="[5, 10]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper"
      :total="filteredPosts.length"
    />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { UsePostStore } from '../../store/modules/post.store'


const postStore = UsePostStore()

const { filteredPosts, currentPage, pageSize} = storeToRefs(postStore)
const { handleSizeChange, handleCurrentChange } = UsePostStore()

</script>