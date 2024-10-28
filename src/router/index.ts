import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import CreateBook from '@/views/CreateBook.vue';
import BookList from '@/views/BookList.vue';
import BookDetail from '@/views/BookDetail.vue'; // Asegúrate de importar el componente
import CreateAuthor from '@/views/CreateAuthor.vue';
import CreateCategory from '@/views/CreateCategory.vue';
import Editorial from '@/views/CreateEditorial.vue'; // Asegúrate de importar el componente de editorial


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
  {
    path: '/create-author',
    name: 'CreateAuthor',
    component: CreateAuthor,
  },
  {
    path: '/create-category',
    name: 'CreateCategory',
    component: CreateCategory,
  },
  {
    path: '/create-editorial', // Ruta para crear una nueva editorial
    name: 'CreateEditorial',
    component: Editorial, // Usa el componente Editorial aquí
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
