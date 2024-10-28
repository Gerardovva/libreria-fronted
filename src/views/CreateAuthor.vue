<template>
  <div class="container mt-5">
    <h2>Crear Nuevo Autor</h2>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre del Autor</label>
        <input
          v-model="autor.nombre"
          type="text"
          id="nombre"
          class="form-control"
          placeholder="Nombre del autor"
          required
        />
      </div>
      <div class="mb-3">
        <label for="fecha_nacimiento" class="form-label">Fecha de Nacimiento</label>
        <input
          v-model="autor.fecha_nacimiento"
          type="date"
          id="fecha_nacimiento"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="nacionalidad" class="form-label">Nacionalidad</label>
        <input
          v-model="autor.nacionalidad"
          type="text"
          id="nacionalidad"
          class="form-control"
          placeholder="Nacionalidad"
        />
      </div>
      <button class="btn btn-primary" type="submit">Agregar Autor</button>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
      <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'CreateAuthor',
  setup() {
    const autor = ref({
      nombre: '',
      fecha_nacimiento: '',
      nacionalidad: ''
    });

    // Define error and successMessage as nullable strings
    const error = ref<string | null>(null);
    const successMessage = ref<string | null>(null);

    const submit = async () => {
      error.value = null;
      successMessage.value = null;

      try {
        const response = await fetch('http://localhost:8000/api/autores/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(autor.value)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Error al crear el autor.');
        }

        const data = await response.json();
        successMessage.value = 'Autor creado exitosamente!';
        console.log('Autor creado:', data);
        
        // Limpiar el formulario
        autor.value = { nombre: '', fecha_nacimiento: '', nacionalidad: '' };
      } catch (err) {
        // Asumimos que err es de tipo Error
        error.value = (err as Error).message; // Se asegura de que err tenga tipo Error
        console.error('Error al crear el autor:', error.value);
      }
    };

    return {
      autor,
      submit,
      error,
      successMessage
    };
  }
};
</script>

<style scoped>
/* Estilos opcionales */
.container {
  max-width: 600px; /* Ajusta el ancho máximo del formulario */
}
</style>
