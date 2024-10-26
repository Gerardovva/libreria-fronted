<template>
  <div>


   <NavigationBar/>

  <main class="form-signin w-100 m-auto">
    <div class="container d-flex justify-content-center">

      <router-view></router-view>
    </div>
  </main>
</div>
</template>



<script>
  import NavigationBar from '@/components/NavigationBar.vue'; // Asegúrate de que el nombre sea 'NavigationBar'

  export default {
    components: {
      NavigationBar // Asegúrate de que aquí también uses 'NavigationBar'
    }
  };
</script>





<style>
html,
body {
  height: 100%;
  background-color: #f8f9fa;
  /* Fondo claro */
}

.form-signin {
  max-width: 100%;
  /* Asegura que el contenedor ocupa todo el ancho disponible */
  padding: 2rem;
  /* Espaciado adicional */
}

.card {
  border-radius: 10px;
  /* Esquinas redondeadas para la tarjeta */
}

.card-body {
  padding: 2rem;
  /* Espaciado interno adicional */
}

.form-label {
  font-weight: bold;
  /* Negrita para las etiquetas */
}

.btn {
  font-weight: bold;
  /* Negrita para el botón */
  border-radius: 5px;
  /* Bordes redondeados para el botón */
}

.text-body-secondary {
  color: #6c757d;
  /* Color secundario para el texto */
}

@media (min-width: 992px) {
  .form-signin {
    padding: 3rem;
    /* Aumentar espaciado en pantallas grandes */
  }

  .card {
    border: 1px solid #dee2e6;
    /* Añadir un borde suave a la tarjeta */
  }

  .card-body {
    padding: 3rem;
    /* Espaciado interno adicional en pantallas grandes */
  }
}

@media (max-width: 576px) {
  .form-signin {
    padding: 1rem;
    /* Reducir el espaciado en pantallas pequeñas */
  }
}
</style>
