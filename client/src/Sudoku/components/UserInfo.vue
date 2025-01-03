<script setup lang="ts">
import { useUserStore } from '@/Sudoku/store/user'

const userStore = useUserStore()
</script>

<template>
  <p>{{ userStore.fullName }}</p>
</template>

<style scoped></style>
