<template>
    <div>
        <h1>Detalles del Libro</h1>
        <div v-if="book">
            <h2>{{ book.titulo }}</h2>
            <img :src="book.imagen" alt="Imagen de {{ book.titulo }}" />
            <p>{{ book.descripcion }}</p>
            <router-link to="/books" class="btn btn-primary">Volver a la lista</router-link>
        </div>
        <div v-else>
            <p>Cargando...</p>
        </div>
    </div>
</template>

<script lang="ts">

interface Book {
  id: number;
  titulo: string;
  imagen: string;
  descripcion: string;
}


import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'BookDetail',
    setup() {
        const book = ref();
        const route = useRoute();

        const fetchBookDetails = async () => {
            const id = route.params.id; // Obtener el ID del libro desde los parámetros de la ruta
            try {
                const response = await fetch(`http://localhost:8000/api/libros/${id}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                book.value = await response.json();
            } catch (error) {
                console.error('Hubo un problema con la operación de fetch:', error);
            }
        };

        onMounted(fetchBookDetails); // Llama a fetchBookDetails cuando el componente esté montado

        return {
            book,
        };
    },
};
</script>

<style scoped>
h1 {
    margin-bottom: 20px;
}
img {
    max-width: 100%; /* Ajusta el tamaño según sea necesario */
    height: auto;
}
</style>
