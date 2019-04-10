import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/components/Top'
import NotFound from '@/components/404'
import Submit from '@/components/Submit'
import Competition from '@/components/Competition'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'top',
      component: Top
    },
    {
      path: '/comp/:competition',
      name: 'competition',
      component: Competition
    },
    {
      path: '/comp/:competition/submit/:submit',
      name: 'submit',
      component: Submit
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ],
  mode: 'history'
})
