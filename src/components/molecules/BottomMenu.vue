<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import IconButton from '../atoms/IconButton.vue'
import { onMounted, onUpdated } from 'vue'

const router = useRouter()
const route = useRoute()

const items = [
  { name: 'Home', iconName: 'home', routeName: 'dashboard' },
  { name: 'Add Note', iconName: 'edit', routeName: 'notes' },
  { name: 'Read Bible', iconName: 'book-open', routeName: 'bible' },
  { name: 'Settings', iconName: 'settings', routeName: 'settings' },
]

const handleMenuItemClicked = (item: (typeof items)[number]) => {
  if (item.routeName) {
    router.push({ name: item.routeName })
  }
}

onMounted(() => {
  console.log('route.name', route.name)
})
</script>

<template>
  <div class="bottom-menu">
    <div class="container">
      <IconButton
        v-for="item in items"
        :key="item.name"
        :name="item.iconName"
        :active="item.name === route.name"
        @click="handleMenuItemClicked(item)"
        :color="item.routeName === route.name ? 'gray' : 'gray-dark'"
        variant="transparent"
      >
      </IconButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom-menu {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid var(--color-gray);
  .container {
    display: flex;
    justify-content: space-between;
    background: var(--color-white);
    padding: 0.5rem;

    z-index: 10;
  }
}
</style>
