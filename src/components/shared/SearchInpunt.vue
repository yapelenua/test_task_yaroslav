<template>
    <el-input v-model="searchQuery" placeholder="Search post" clearable @clear="clearSearch" @input="saveToLocalStorage" class="mb-4" />
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { UseGeneralStore } from '../../store/modules/general.store'
import { UsePostStore } from '../../store/modules/post.store'

import {onMounted} from "vue";

const postStore = UsePostStore()

const { searchQuery } = storeToRefs(postStore)
const { clearSearch } = UseGeneralStore()

onMounted(() => {
  const savedSearchQuery = localStorage.getItem('searchQuery');
  if (savedSearchQuery) {
    searchQuery.value = savedSearchQuery;
  }
});

function saveToLocalStorage() {
  localStorage.setItem('searchQuery', searchQuery.value);
}
</script>