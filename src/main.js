

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar'


// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'


import App from './App.vue';
import router from './router'; // if using Vue Router

const app = createApp(App);
const pinia = createPinia();


app.use(Quasar, {
  plugins: {}, // import Quasar plugins and add here
})

app.use(pinia);
app.use(router); // if using Vue Router

app.mount('#app');

