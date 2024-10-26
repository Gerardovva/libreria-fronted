<template>
    <div class="container mt-5">
      <h2>Crear Nueva Categoría</h2>
      <form @submit.prevent="submit">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre de la Categoría</label>
          <input v-model="nombre" type="text" id="nombre" class="form-control" placeholder="Nombre de la categoría" required />
        </div>
        <button class="btn btn-primary" type="submit">Agregar Categoría</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'CreateCategory',
    setup() {
      const nombre = ref('');
  
      const submit = async () => {
        try {
          const response = await axios.post('http://localhost:8000/api/categorias/', {
            nombre: nombre.value,
          });
          console.log('Categoría creada:', response.data);
          nombre.value = ''; // Limpiar el campo después de agregar
        } catch (error) {
          console.error('Error al crear la categoría:', error);
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
  