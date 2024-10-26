<template>
    <div class="container mt-5">
      <h2>Crear Nuevo Autor</h2>
      <form @submit.prevent="submit">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre del Autor</label>
          <input v-model="nombre" type="text" id="nombre" class="form-control" placeholder="Nombre del autor" required />
        </div>
        <button class="btn btn-primary" type="submit">Agregar Autor</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'CreateAuthor',
    setup() {
      const nombre = ref('');
  
      const submit = async () => {
        try {
          const response = await axios.post('http://localhost:8000/api/autores/', {
            nombre: nombre.value,
          });
          console.log('Autor creado:', response.data);
          nombre.value = ''; // Limpiar el campo después de agregar
        } catch (error) {
          console.error('Error al crear el autor:', error);
        }
      };
  
      return {
        nombre,
        submit,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales */
  </style>
  