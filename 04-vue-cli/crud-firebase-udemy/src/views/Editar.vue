<template>
    <div>
        <h2>Editar</h2>
        {{id}} - {{tarea}}
        <form action="">
            <input type="text" v-model="tarea.nombre">
            <button >Editar</button>
        </form>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name:'Editar',
    data() {
        return {
            id: this.$route.params.id,
        }
    },
    methods:{
        ...mapActions(['getTarea'])
    },
    created() {
        this.getTarea(this.id)
    },
    computed: {
        ...mapState(['tarea'])
    }
}
</script>