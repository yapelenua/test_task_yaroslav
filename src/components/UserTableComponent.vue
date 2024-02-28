<template>
  <div class="w-[769px]">
    <AppTable :data="users" :columns="userColumns" class="w-full">
      <template #expand="{ props }">
        <AppTable :data="props.row.posts" :columns="userPostColumns" class="w-full" @rowClick="openDialog" />
      </template>
    </AppTable>
  </div>
</template>

<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { UseUserStore } from '../store'
  import { UsePostStore } from '../store/modules/post.store'
  import { onMounted } from "vue";
  import AppTable from "@/components/shared/AppTable.vue";
  import {userColumns, userPostColumns} from '../core/utils'

  const userStore = UseUserStore()
  const { users } = storeToRefs(userStore)
  const { openDialog } = UsePostStore()
  const { fetchUsersPosts } = UseUserStore()

  onMounted(() => {
    fetchUsersPosts()
  })
</script>