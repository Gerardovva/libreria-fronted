<template>
  <div class="container">
    <div class="row mt-5 justify-content-center">
      <div class="col-lg-4 col-md-6 col-sm-8">
        <div class="card shadow-lg border-0 rounded">
          <div class="card-body">
            <form @submit.prevent="submit">
              <h1 class="h3 mb-4 fw-normal text-center">Crear Libro</h1>

              <div class="mb-3">
                <label for="titulo" class="form-label">Título</label>
                <input v-model="data.titulo" type="text" id="titulo" class="form-control" placeholder="Título del libro" required />
              </div>

              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea v-model="data.descripcion" id="descripcion" class="form-control" placeholder="Descripción del libro" required></textarea>
              </div>

              <div class="mb-3">
                <label for="imagen" class="form-label">Imagen</label>
                <input type="file" @change="handleFileUpload" class="form-control" required />
              </div>

              <button class="btn btn-primary w-100 py-2" type="submit">Crear Libro</button>

              <p class="mt-4 mb-0 text-center text-body-secondary">&copy; 2024</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; // Asegúrate de tener axios instalado

export default {
  name: 'CreateBookPage',

  setup() {
    const data = reactive({
      titulo: '',
      descripcion: '',
      imagen: null as File | null // Asegúrate de que la imagen sea del tipo File o null
    });

    const router = useRouter();

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        data.imagen = target.files[0]; // Asigna el archivo a data.imagen
      }
    };

    const submit = async () => {
      const formData = new FormData();
      formData.append('titulo', data.titulo);
      formData.append('descripcion', data.descripcion);
      if (data.imagen) {
        formData.append('imagen', data.imagen); // Agrega la imagen a FormData
      }

      try {
        const token = localStorage.getItem('token'); // Asegúrate de obtener el token
        await axios.post('http://localhost:8000/api/libros/', formData, {
          headers: {
            'Authorization': `Bearer ${token}`, // Incluye el token en los encabezados
            'Content-Type': 'multipart/form-data', // Este encabezado se establecerá automáticamente con FormData, puedes omitirlo
          }
        });
        await router.push('/books'); // Redirige después de crear el libro
      } catch (error) {
        console.error('Error al crear el libro:', error);
      }
    };

    return {
      data,
      submit,
      handleFileUpload
    };
  }
};
</script>

<style scoped>
/* Puedes agregar estilos aquí si es necesario */
</style>
