import Vue from 'vue'

import App from './App.vue'
import Api from '@/api'

import router from './router'
import store from './store'

Vue.use(Api)

Vue.config.productionTip = false

Vue.directive("click-outside", {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
