import { createWebHistory, createRouter } from 'vue-router'

import EditNotesPage from './Notes/EditNotesPage.vue'
import MyNotesPage from './Notes/MyNotesPage.vue'

const routes = [
  { path: '/', redirect: '/notes' },
  { path: '/notes/:id', component: EditNotesPage },
  { path: '/notes', component: MyNotesPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }
