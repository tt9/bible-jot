<script setup lang="ts">
import AppButton from '../../components/atoms/AppButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <p class="welcome-header__title">Welcome!</p>
  <p>
    <small>Let's take some notes</small>
  </p>
  <div>
    <AppButton @click="router.replace('/notes')">Your Notes</AppButton>
  </div>
</template>
<style lang="scss">
.welcome-header {
  &__title {
    margin-bottom: 0;
    font-size: var(--font-size-5);
    font-weight: bold;
  }
}
</style>
