<template>
    <div class="container"> 
      <div class="row mt-5 justify-content-center">
        <div class="col-lg-4 col-md-6 col-sm-8">
          <div class="card shadow-lg border-0 rounded">
            <div class="card-body">
              <form @submit.prevent="submit">
                <h1 class="h3 mb-4 fw-normal text-center">Please Register</h1>
  
                <div class="mb-3">
                  <label for="nombre" class="form-label">Username</label>
                  <input v-model="data.name" type="text" id="nombre" class="form-control" placeholder="username" required/>
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label">Email address</label>
                  <input v-model="data.email" type="email" id="email" class="form-control" placeholder="correo electronico" required/>
                </div>
  
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input v-model="data.password" type="password" id="password"  class="form-control"   placeholder="Contraseña"   required/>
                </div>
  
                <button class="btn btn-primary w-100 py-2" type="submit">Submit</button>
  
                <p class="mt-4 mb-0 text-center text-body-secondary">&copy; 2024</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>


<script lang="ts">
import { reactive} from 'vue';
import { useRouter } from 'vue-router';

    export default{
        name:'RegisterPage',

        setup(){
            const data= reactive({
                name: '',
                email: '',
                password: ''
            });

            const router=useRouter()

            const submit =async() => { 
                 await fetch('http://localhost:8000/api/register/',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                 })

                 await router.push('/login')
            }

            return{
               data,
               submit
            }

            
        }
    }
</script>