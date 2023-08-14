import App from './App.vue';
import './styles.css';

import { createApp } from 'vue';

import { registerPlugins } from '@/plugins';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');
