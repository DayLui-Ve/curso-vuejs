<template>
    <div class="mt-5">
        <h1>Vuelidate</h1>

        <form>

            <input 
                type="email"
                placeholder="Ingresa un email" 
                class="form-control my-3"
                v-model="$v.email.$model"
                :class="{'is-invalid': $v.email.$error}"
                >

            <p class="text-danger" v-if="!$v.email.email">El email es incorrexto</p>
            <p class="text-danger" v-if="!$v.email.required">El email es requerido</p>
            <!-- <p>{{$v.email}}</p> -->

            <input type="password" placeholder="Ingresa contraseña" class="form-control my-3"
                v-model="$v.password.$model"
                :class="{'is-invalid': $v.password.$error}"
                >
                <p class="text-danger" v-if="!$v.password.minLength">Mínimo 6 caracteres</p>
                <!-- <p>{{$v.password}}</p> -->
            <input type="password" placeholder="Repite contraseña" class="form-control my-3"
                v-model="$v.repeatPassword.$model"
                :class="{'is-invalid': $v.repeatPassword.$error}">
                <p class="text-danger" v-if="!$v.repeatPassword.sameAsPassword">Contraseña incorrecta</p>
                <!-- <p>{{$v.repeatPassword}}</p> -->

        </form>

    </div>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";

export default {
    name:'Vuelidate',
    data(){
        return {
            email: '',
            password: '',
            repeatPassword: '',
        }
    },
    validations: {
        email: {required, email},
        password: { 
            required,
            minLength: minLength(6),
        },
        repeatPassword: {
            sameAsPassword: sameAs('password')
        }
    }
}
</script>