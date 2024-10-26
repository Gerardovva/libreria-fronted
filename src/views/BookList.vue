<template>
  <div>
    <h1>Lista de Libros</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Título</th>
          <th>Imagen</th>
          <th>Descripción</th>
          <th>Categoría</th>
          <th>Autores</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="books.length === 0">
          <td colspan="7">No hay libros disponibles.</td>
        </tr>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.titulo }}</td>
          <td>
            <img :src="book.imagen" alt="Imagen de {{ book.titulo }}" style="width: 100px; height: auto;" />
          </td>
          <td>{{ book.descripcion }}</td>
          <td>{{ book.categoria?.nombre || 'Sin categoría' }}</td>
          <td>
            <ul>
              <li v-for="autor in book.autores" :key="autor.id">{{ autor.nombre }}</li>
            </ul>
          </td>
          <td>
            <div class="container g-5">
              <button @click="deleteBook(book.id)" class="btn btn-danger me-2">Eliminar</button>
              <router-link :to="{ name: 'bookDetail', params: { id: book.id } }" class="btn btn-info">Ver Detalles</router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';

interface Autor {
  id: number;
  nombre: string;
}

interface Categoria {
  id: number;
  nombre: string;
}

interface Book {
  id: number;
  titulo: string;
  imagen: string;
  descripcion: string;
  categoria?: Categoria;
  autores: Autor[];
}

export default {
  name: 'BookList',

  setup() {
    const books = ref<Book[]>([]);

    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/libros/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        books.value = data;
      } catch (error) {
        console.error('Hubo un problema con la operación de fetch:', error);
      }
    };

    const deleteBook = async (id: number) => {
      if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
        try {
          const response = await fetch(`http://localhost:8000/api/libros/${id}/`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('No se pudo eliminar el libro');
          }

          books.value = books.value.filter(book => book.id !== id);
        } catch (error) {
          console.error('Hubo un problema al eliminar el libro:', error);
        }
      }
    };

    onMounted(fetchBooks);

    return {
      books,
      deleteBook,
    };
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  margin-top: 20px;
}

.table img {
  width: 50px;
  height: auto;
}

ul {
  padding-left: 20px;
  list-style-type: disc;
}
</style>
