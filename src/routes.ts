import { createWebHistory, createRouter } from 'vue-router'

import EditNotesPage from './Notes/EditNotesPage.vue'
import MyNotesPage from './Notes/MyNotesPage.vue'
import DashboardPage from './Home/DashboardPage.vue'

const routes = [
  { path: '/', component: DashboardPage, name: 'dashboard' },
  { path: '/notes/:id', component: EditNotesPage, name: 'edit-note' },
  { path: '/notes', component: MyNotesPage, name: 'notes' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router }
