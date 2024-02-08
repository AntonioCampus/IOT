// IMPORT GLOBAL STYLES
import './assets/css/style.css'
import 'floating-vue/dist/style.css'

// IMPORT LIBRARIES
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import AlertDataRowVue from './components/AlertDataRow.vue';
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n';

import { faTriangleExclamation, faClock, faCrow, faCamera, faBug, faCrosshairs, faRobot, faQuoteLeft, faClockRotateLeft, faPlus, faEye, faThumbsUp, faLocationDot, faAlignLeft, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';

// IMPORT ICONS
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

// MULTI LANGUAGE SUPPORT
import i18n from './config/i18n';

// CREATE APP
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('AlertDataRowVue', AlertDataRowVue);
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(FloatingVue)
app.use(VueSweetalert2);

// MOUNT APP
app.mount('#app')
