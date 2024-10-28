<template>
  <div class="container mt-5">
    <h1 class="text-center">Crear Editorial</h1>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre:</label>
        <input
          type="text"
          id="nombre"
          v-model="editorial.nombre"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <label for="direccion" class="form-label">Dirección:</label>
        <input
          type="text"
          id="direccion"
          v-model="editorial.direccion"
          class="form-control"
        />
      </div>
      <div class="mb-3">
        <label for="contacto" class="form-label">Contacto:</label>
        <input
          type="email"
          id="contacto"
          v-model="editorial.contacto"
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-primary">Crear Editorial</button>
    </form>
    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editorial: {
        nombre: '',
        direccion: '',
        contacto: ''
      },
      error: null,
      successMessage: null
    };
  },
  methods: {
    async submitForm() {
      this.error = null;
      this.successMessage = null;

      try {
        const response = await fetch('http://127.0.0.1:8000/api/editoriales/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.editorial)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Error al crear la editorial.');
        }

        const data = await response.json();
        this.successMessage = 'Editorial creada exitosamente!';
        console.log(data); // Puedes manejar el objeto `data` como desees
        this.editorial = { nombre: '', direccion: '', contacto: '' }; // Limpiar el formulario
      } catch (error) {
        this.error = error.message;
        console.error('Error al crear la editorial:', error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px; /* Ajusta el ancho máximo del formulario */
}
</style>
