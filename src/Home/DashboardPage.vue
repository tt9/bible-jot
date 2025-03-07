<script lang="ts" setup>
import DefaultLayout from '../components/templates/DefaultLayout.vue'

import WelcomeHeader from './DashboardPage/WelcomeHeader.vue'
</script>
<template>
  <DefaultLayout>
    <div class="container p-2 app-surface">
      <div class="dashboard-grid p-2 pt-8">
        <div class="dashboard-grid__item welcome-header">
          <WelcomeHeader></WelcomeHeader>
        </div>

        <div class="dashboard-grid__item recent-notes-header">
          <p class="dashboard-grid__item--title">Recent Notes</p>
        </div>
        <div class="dashboard-grid__item news-and-updates-header">
          <p class="dashboard-grid__item--title">News and Updates</p>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<style lang="scss" scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0.25rem;

  .news-and-updates-header,
  .welcome-header {
    grid-column: span 12;

    &__title {
      margin-bottom: 0;
    }
  }
}
</style>
