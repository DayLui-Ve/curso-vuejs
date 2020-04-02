<template>
    <div>
        <h1>Lista de tareas</h1>
        <ul>
            <li v-for="item of tareas" :key="item.id">
                {{item.id}} - {{item.nomre}}
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name:'Inicio',
    methods:{
        ...mapActions(['getTareas'])
    },
    computed:{
        ...mapState(['tareas'])
    },
    created() {
        this.getTareas()
    },
}
</script>