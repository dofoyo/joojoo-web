// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import vue from 'vue'
import app from './app'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'

import 'bootstrap/dist/css/bootstrap.css';

import vueresource from 'vue-resource';

import {store} from './store/questionlist';

import ElementUI from 'element-ui'

vue.use(ElementUI)

vue.use(vueresource);

vue.config.productionTip = false

/* eslint-disable no-new */
new vue({
	store:store,
  el: '#app', 
  router,
  template: '<app/>',
  components: { app }
}).$mount('#app')
