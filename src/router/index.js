import Vue from 'vue'
import Router from 'vue-router'
import collectquestion from '@/components/collectquestion'
import questionlist from '@/components/questionlist'
import questionview from '@/components/questionview'
import knowledgeTagChart from '@/components/knowledgeTagChart'
import wrongTagChart from '@/components/wrongTagChart'
import wrongRateChart from '@/components/wrongRateChart'
import difficultyChart from '@/components/difficultyChart'
import collectImage from '@/components/collectImage'

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
    },
    {
      path: '/wrongTagChart',
      name: 'wrongTagChart',
      component: wrongTagChart
    },
    {
      path: '/knowledgeTagChart',
      name: 'knowledgeTagChart',
      component: knowledgeTagChart
    },
    {
      path: '/wrongRateChart',
      name: 'wrongRateChart',
      component: wrongRateChart
    },
    {
      path: '/difficultyChart',
      name: 'difficultyChart',
      component: difficultyChart
    },
    {
      path: '/collectImage',
      name: 'collectImage',
      component: collectImage
    }
  ]

})
