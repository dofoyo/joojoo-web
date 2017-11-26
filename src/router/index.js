import Vue from 'vue'
import Router from 'vue-router'
import collectquestion from '@/components/collectquestion'
import questionlist from '@/components/questionlist'
import questionview from '@/components/questionview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/collectquestion'
    },
    {
      path: '/collectquestion',
      name: 'collectquestion',
      component: collectquestion
    },
    {
      path: '/questionlist',
      name: 'questionlist',
      component: questionlist
    },
    {
      path: '/question/:id',
      name: 'questionview',
      component: questionview,
      props: true
    }
  ]
})
