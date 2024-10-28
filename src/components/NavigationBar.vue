<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark p-4 mb-4">
        <div class="container-fluid">
            <a class="navbar-brand "  >Home</a>
            <div>
                <!-- Mostrar Login y Register si no está autenticado -->
                <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="!auth">
                    <li class="nav-item active">
                        <router-link to="/login" class="nav-link">Login</router-link>
                    </li>
                    <li class="nav-item active">
                        <router-link to="/register" class="nav-link">Register</router-link>
                    </li>
                </ul>
                <!-- Mostrar Logout y Agregar libro si está autenticado -->
                <ul class="navbar-nav me-auto mb-2 mb-md-0" v-if="auth">
                    <li class="nav-item">
                        <router-link to="/crear-libro" class="nav-link custom">Agregar libro</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/books" class="nav-link custom">Lista de libros</router-link> <!-- Cambia 1 por el ID adecuado -->
                    </li>
                    <li class="nav-item">
                        <router-link to="/create-category" class="nav-link custom">Crear categoria</router-link> <!-- Cambia 1 por el ID adecuado -->
                    </li>
                    <li class="nav-item">
                        <router-link to="/create-author" class="nav-link custom">Crear autor</router-link> <!-- Cambia 1 por el ID adecuado -->
                    </li>
                    <li class="nav-item">
                        <router-link to="/create-editorial" class="nav-link custom">Crear editorial</router-link> <!-- Cambia 1 por el ID adecuado -->
                    </li>
                    <li class="nav-item">
                        <router-link to="/" class="nav-link custom" @click.prevent="logout">Logout</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';

export default {
    name: 'NavigationBar',

    setup() {
        const store = useStore();
        const auth = computed(() => store.state.authenticated);

        // Función para hacer logout
        const logout = async () => {
            await fetch('http://localhost:8000/api/logout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            // Actualizar estado de autenticación usando la acción correcta
            store.dispatch('setAuth', false); // Cambiado de commit a dispatch

            // Redireccionar al usuario a la página de inicio o de login
            router.push('/login');
        };

        return {
            auth,
            logout,
        };
    }
}
</script>

<style scoped>

.custom{
    color: #fff;
    border: 1px solid;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;

}

.color{

   background-color: #38071c;
    box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.2);
}

</style>
