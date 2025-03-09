<script lang="ts" setup>
import DefaultLayout from '../components/templates/DefaultLayout.vue'

import WelcomeHeader from './DashboardPage/WelcomeHeader.vue'
</script>
<template>
  <DefaultLayout>
    <div class="container p-2 app-surface">
      <div class="dashboard-grid p-2 pt-8">
        <div class="dashboard-grid__item welcome-header mb-8">
          <WelcomeHeader></WelcomeHeader>
        </div>

        <div class="dashboard-grid__item news-and-updates-header">
          <h6 class="news-and-updates-header__title mb-4">News and Updates</h6>
          <p>
            Thank you for using BibleJot! BibleJot is currently in a beta
            release. Features and experience are subject to change.
          </p>
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
  }
}
</style>
