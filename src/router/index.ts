import { createRouter, createWebHistory } from 'vue-router'
import BpmnJsSampleView from '../views/BpmnJsSampleView.vue'

export const routes = {
  bpmnJsSample: '/bpmn-js',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: routes.bpmnJsSample,
      name: 'bpmn-js',
      component: BpmnJsSampleView,
    },
  ],
})

export default router
