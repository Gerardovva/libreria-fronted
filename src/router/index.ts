import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import CreateBook from '@/views/CreateBook.vue';
import BookList from '@/views/BookList.vue';
import BookDetail from '@/views/BookDetail.vue'; // Asegúrate de importar el componente

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/crear-libro', component: CreateBook },
  { path: '/books', component: BookList },
  {
    path: '/books/:id', // Ruta para ver detalles de un libro
    name: 'bookDetail',
    component: BookDetail,
    props: true, // Permite pasar el id como prop al componente
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
