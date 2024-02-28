<template>
  <el-select
    ref="userSelectRef"
    :modelValue="activeUser"
    placeholder="Select user"
    clearable
    automaticDropdown
    @update:modelValue="selectActiveUser($event)"
  >
    <el-option v-for="item in users" :key="item.id" :label="item.name" :value="item.id">
      <div class="flex justify-between items-center">
        <span>{{ item.name }}</span>

        <span>→</span>
      </div>
    </el-option>
  </el-select>
</template>

<script lang="ts" setup>
  import { storeToRefs } from 'pinia'
  import { UseUserStore } from '../store'
  import {onMounted, ref, watch} from 'vue';
  import type { IUser } from "@/types/user.types";
  import router from "@/router";

  const userSelectRef = ref()


  const userStore = UseUserStore()
  const { users, selectedUser } = storeToRefs(userStore)
  const { selectUser, fetchUsers } = UseUserStore()

  const activeUser = ref()

  onMounted(() => {
    fetchUsers()
      .then(() => {
        activeUser.value = users.value.find((e) => e.id.toString() === localStorage.getItem('selected-user'))?.id

        if (activeUser.value) {
          router.push({ name: 'PostTable'})

          selectUser(activeUser.value)
        }

        userSelectRef.value?.focus()
      })
  })

  watch(() => selectedUser.value, (value) => {
    if (!value) {
      activeUser.value = null
      localStorage.setItem('selected-user', '')
    }
  })

  function selectActiveUser (id: number) {
    activeUser.value = id

    const selectedUser = users.value.find((e) => e.id === id) as IUser

    localStorage.setItem('selected-user', id.toString())

    selectUser(selectedUser)
  }
</script>
