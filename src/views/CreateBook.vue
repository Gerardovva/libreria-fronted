<template>
  <div class="container">
    <div class="row mt-5 justify-content-center">
      <div class="col-lg-6 col-md-8 col-sm-10">
        <div class="card shadow-lg border-0 rounded">
          <div class="card-body">
            <form @submit.prevent="submit">
              <h1 class="h3 mb-4 fw-normal text-center">Crear Libro</h1>

              <div class="mb-3">
                <label for="titulo" class="form-label">Título</label>
                <input v-model="data.titulo" type="text" id="titulo" class="form-control" placeholder="Título del libro"
                  required />
              </div>

              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea v-model="data.descripcion" id="descripcion" class="form-control"
                  placeholder="Descripción del libro" required></textarea>
              </div>

              <div class="mb-3">
                <label for="imagen" class="form-label">Imagen</label>
                <input type="file" @change="handleFileUpload" class="form-control" required />
              </div>

              <!-- Selección de Categoría -->
              <div class="mb-3">
                <label for="categoria" class="form-label">Categoría</label>
                <select v-model="data.categoriaId" id="categoria" class="form-select" required>
                  <option disabled value="">Selecciona una categoría</option>
                  <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
                    {{ categoria.nombre }}
                  </option>
                </select>
              </div>

              <!-- Selección de Autores -->
              <div class="mb-3">
                <label for="autores" class="form-label">Autores</label>
                <select v-model="data.autorIds" id="autores" class="form-select" multiple size="5" required>
                  <option disabled value="">Selecciona uno o más autores</option>
                  <option v-for="autor in autores" :key="autor.id" :value="autor.id">
                    {{ autor.nombre }}
                  </option>
                </select>
              </div>

              <!-- Selección de Editorial -->
              <div class="mb-3">
                <label for="editorial" class="form-label">Editorial</label>
                <select v-model="data.editorialId" id="editorial" class="form-select" required>
                  <option disabled value="">Selecciona una editorial</option>
                  <option v-for="editorial in editoriales" :key="editorial.id" :value="editorial.id">
                    {{ editorial.nombre }}
                  </option>
                </select>
              </div>

              <!-- Fecha de Publicación -->
              <div class="mb-3">
                <label for="fechaPublicacion" class="form-label">Fecha de Publicación</label>
                <input v-model="data.fechaPublicacion" type="date" id="fechaPublicacion" class="form-control"
                  required />
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
import { reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Definición de interfaces
interface Categoria {
  id: string;
  nombre: string;
}

interface Autor {
  id: string;
  nombre: string;
}

interface Editorial {
  id: string;
  nombre: string;
}

export default {
  name: 'CreateBookPage',

  setup() {
    const data = reactive({
      titulo: '',
      descripcion: '',
      imagen: null as File | null,
      categoriaId: '' as string,
      autorIds: [] as string[],
      editorialId: '' as string,
      fechaPublicacion: '' as string,
    });

    const categorias = ref<Categoria[]>([]);
    const autores = ref<Autor[]>([]);
    const editoriales = ref<Editorial[]>([]);

    const router = useRouter();

    const handleFileUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        data.imagen = target.files[0];
      }
    };

    const fetchCategoriesAndAuthors = async () => {
      try {
        const [categoriesResponse, authorsResponse, editorialesResponse] = await Promise.all([
          axios.get<Categoria[]>('http://localhost:8000/api/categorias/'),
          axios.get<Autor[]>('http://localhost:8000/api/autores/'),
          axios.get<Editorial[]>('http://localhost:8000/api/editoriales/'),
        ]);

        categorias.value = categoriesResponse.data;
        autores.value = authorsResponse.data;
        editoriales.value = editorialesResponse.data;

        console.log('categorias', categorias.value);
        console.log("autores ", autores.value);
        console.log('editoriales', editoriales.value);
      } catch (error) {
        console.error('Error al obtener categorías y autores:', error);
      }
    };

    const submit = async () => {
      const formData = new FormData();
      formData.append('titulo', data.titulo);
      formData.append('descripcion', data.descripcion);
      if (data.imagen) {
        formData.append('imagen', data.imagen);
      }
      formData.append('categorias', data.categoriaId);
      formData.append('editorial', data.editorialId);
      formData.append('fechaPublicacion', data.fechaPublicacion);
      formData.append('autor', data.autorIds.join(',')); // Convertir autorIds a una cadena separada por comas

      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:8000/api/libros/', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        await router.push('/books');
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error('Error al crear el libro:', error.response.data);
          alert('Error al crear el libro: ' + (error.response.data.message || 'Error desconocido'));
        } else {
          console.error('Error desconocido:', error);
          alert('Error al crear el libro: Error desconocido');
        }
      }
    };

    onMounted(() => {
      fetchCategoriesAndAuthors();
    });

    return {
      data,
      submit,
      handleFileUpload,
      categorias,
      autores,
      editoriales,
    };
  }
};
</script>

<style scoped>
/* Estilos opcionales */
</style>
