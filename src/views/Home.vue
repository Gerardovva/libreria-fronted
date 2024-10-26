<template>

    <div class="container">
        <div class="row d-flex justify-content-center">
          
                <h1 class="text-center" style="font-weight: 800;">  {{ mensaje }}</h1>
                <h3>Bienvino a la bliblioteca de libros de programacion</h3>
               
                
                <img src="@/assets/biblioteca.jpg" alt="">
           
        </div>
      

    </div>

</template>


<script lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';


export default {
    name: 'HomePage',

    setup() {
        const mensaje = ref('No has iniciado sesión');
        const store=useStore();


        onMounted(async () => {
            try {
                const response = await fetch('http://localhost:8000/api/user/', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'

                });

                const content = await response.json();

                mensaje.value = `Hola ${content.name} `;


                await store.dispatch('setAuth', true);    

            } catch (error) {
                await store.dispatch('setAuth', false);
            }
        });


        return {
            mensaje
        }
    }
}
</script>