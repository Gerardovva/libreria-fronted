<template>
  <!-- <section class="vh-100" style="background-color: #9A616D;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 1rem;">
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form>

                  <div class="d-flex align-items-center mb-3 pb-1">
                    <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                    <span class="h1 fw-bold mb-0">Logo</span>
                  </div>

                  <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account</h5>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="email" id="form2Example17" class="form-control form-control-lg" />
                    <label class="form-label" for="form2Example17">Email address</label>
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="password" id="form2Example27" class="form-control form-control-lg" />
                    <label class="form-label" for="form2Example27">Password</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-lg btn-block" type="button">Login</button>
                  </div>

                  <a class="small text-muted" href="#!">Forgot password?</a>
                  <p class="mb-5 pb-lg-2" style="color: #393f81;">Don't have an account? <a href="#!"
                      style="color: #393f81;">Register here</a></p>
                  <a href="#!" class="small text-muted">Terms of use.</a>
                  <a href="#!" class="small text-muted">Privacy policy</a>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> -->
    <div class="container">
      <div class="row mt-5 justify-content-center">
        <div class="col-lg-4 col-md-6 col-sm-8">
          <div class="card shadow-lg border-0 rounded">
            <div class="card-body">
              <form @submit.prevent="submit">
                <h1 class="h3 mb-4 fw-normal text-center">Please Sign In</h1>
  
                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input v-model="data.email" type="email" id="email" class="form-control"
                    placeholder="correo electronico" required />
                </div>
  
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input v-model="data.password" type="password" id="password" class="form-control"
                    placeholder="Contraseña" required />
                </div>
  
                <button class="btn btn-enviar w-100 py-2" type="submit">Sign In</button>
  
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
  
  export default {
    name: 'LoginPage',
  
    setup() {
      const data = reactive({
        email: '',
        password: ''
      });
  
      const router = useRouter()
  
      const submit = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Para enviar cookies al backend
            body: JSON.stringify(data),
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error en la solicitud:', errorData);
            throw new Error(`Error ${response.status}: ${errorData.detail || 'No autorizado'}`);
          }
  
          const responseData = await response.json();
          // console.log('Token recibido:', responseData.jwt);
          await router.push('/'); // Redirecciona al home page si el login es exitoso
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
      };
  
  
      return {
        data,
        submit
      }
  
    }
  }
  </script>



<style scoped>
.btn-enviar{
  background-color: #4CAF50;
}

</style>