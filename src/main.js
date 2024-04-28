// src/main.js
import 'vant/lib/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import AppHeader from './components/AppHeader.vue';
import TodoList from './components/TodoList.vue';

import { bus } from './bus';
import router from './router/index.js';
import { Search,DropdownMenu, DropdownItem,Swipe, SwipeItem, Cell, CellGroup, Tag, Switch, Button } from 'vant';
import pkg from 'vant';
import { Image as VanImage } from 'vant';


const { createVuePlugin } = pkg;

const app = createApp(App);
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
if (!isLoggedIn) {
  router.push('/login');
}

app.component('AppHeader', AppHeader);
app.component('TodoList', TodoList);


app.config.globalProperties.$bus = bus;
app.use(router)
app.use(Search);
app.use(DropdownMenu);
app.use(DropdownItem);
app.use(Swipe);
app.use(SwipeItem);
app.use(VanImage);
app
  .use(Cell)
  .use(CellGroup)
  .use(Tag)
  .use(Switch)
  .use(Button);

app.mount('#app');

