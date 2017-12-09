// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import vue from 'vue'
import app from './app'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css';

import vueresource from 'vue-resource';

vue.use(vueresource);


vue.config.productionTip = false

/* eslint-disable no-new */
new vue({
  el: '#app', 
  router,
  template: '<app/>',
  components: { app }
}).$mount('#app')
