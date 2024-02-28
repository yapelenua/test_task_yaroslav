<template>
  <div class="flex justify-between md:p-[55px] md:flex-row flex-col p-[15px]" v-loading="loading">

      <UserDropdown class="mr-20 md:!w-[280px] w-full" />

      <SwitchComponent v-model="isPostsByUser" @change="onChangeTableMode"/>
    <div class="w-full">
      <SearchInput class="h-[40px] !w-[256px]" />
      <router-view
      #default="{ Component }"
      class="overflow-auto w-full mt-20"
    >
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    </div>

    <DialogComponent />
  </div>
</template>

<script setup lang="ts">
import UserDropdown from "@/components/UserDropdown.vue"
import DialogComponent from '@/components/DialogComponent.vue'

import { storeToRefs } from 'pinia'
import { UseUserStore } from '../../src/store'
import {UseGeneralStore} from '../store/modules/general.store'
import { ref, watch, onMounted} from "vue";
import SearchInput from '@/components/shared/SearchInpunt.vue'
import SwitchComponent from '@/components/shared/SwitchComponent.vue'
import router from "@/router";

const userStore = UseUserStore()
const generalStore = UseGeneralStore()
const { selectedUser } = storeToRefs(userStore)
const { fetchUsersPosts } = UseUserStore()

const { loading } = storeToRefs(generalStore)

const isPostsByUser = ref(false)

watch(() => selectedUser.value, (value) => {
  if (value) {
    isPostsByUser.value = true
    fetchUsersPosts(typeof value === 'number' ? value : value.id)
    router.push({ name: 'PostTable'})
  } else {
    isPostsByUser.value = false
    router.push({ name: 'UserTable'})
  }
})

function onChangeTableMode (value: number) {
  if (!value) {
    selectedUser.value = null
    router.push({ name: 'UserTable'})
  }
}

onMounted(() => {
  fetchUsersPosts()
})
</script>
