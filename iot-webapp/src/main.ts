import './assets/css/style.css'
import 'floating-vue/dist/style.css'

//import { createI18n } from 'vue-i18n';
import lang from './assets/js/lang/lang';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTriangleExclamation, faClock, faCrow, faCamera, faBug, faCrosshairs, faRobot, faQuoteLeft, faClockRotateLeft, faPlus, faEye, faThumbsUp, faLocationDot, faAlignLeft, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faTriangleExclamation);
library.add(faClock);
library.add(faCrow);
library.add(faCamera);
library.add(faBug);
library.add(faCrosshairs);
library.add(faRobot);
library.add(faQuoteLeft);
library.add(faClockRotateLeft);
library.add(faPlus);
library.add(faEye);
library.add(faThumbsUp);
library.add(faLocationDot);
library.add(faAlignLeft);
library.add(faTrash);
library.add(faUser);

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon);

/* const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: lang,
}); */

//app.use(i18n);
app.use(createPinia())
app.use(router)
app.use(FloatingVue)
app.use(VueSweetalert2);

app.mount('#app')
