<script lang="ts" setup>
import DefaultLayout from '../components/templates/DefaultLayout.vue'
</script>
<template>
  <DefaultLayout>
    <div class="container p-2">
      <div class="dashboard-grid p-2 pt-8">
        <div class="dashboard-grid__item">
          <p class="dashboard-grid__item--title">Recent Notes</p>
        </div>
        <div class="dashboard-grid__item">
          <p class="dashboard-grid__item--title">News and Updates</p>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style lang="scss" scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.25rem;

  &__item {
    &--title {
      font-weight: bold;
      font-size: var(--font-size-3);
    }
  }
}
</style>
