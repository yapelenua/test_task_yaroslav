<template>
  <el-table :data="data" border @rowClick="$emit('rowClick', $event)">
    <el-table-column
      v-for="column in columns"
      :key="column.prop"
      :prop="column.prop"
      :label="column.label"
      :width="column?.width"
      :type="column?.type || ''"
    >
      <template v-if="column?.type" #default="props">
        <slot name="expand" :props="props" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import type { IColumns, TData } from '../../types/general.types'
defineProps<{
  columns: IColumns[],
  data: TData
}>()

defineEmits(['rowClick'])
</script>
