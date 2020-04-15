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
            <p>{{$v.email}}</p>
        </form>

    </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";

export default {
    name:'Vuelidate',
    data(){
        return {
            email: '',
        }
    },
    validations: {
        email: {required, email}
    }
}
</script>