import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import mixins from "./mixins"
import store from '@/store/index'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

loadFonts()

createApp(App)
  .use(VueSweetalert2)
  .use(router)
  .mixin(mixins)
  .use(vuetify)
  .use(store)
  .mount('#app')
