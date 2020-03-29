Vue.component('hijo', {
    template:/*html*/
    `
    <div class="py-5 bg-success">
        <h4>Componente hijo: {{numero}}</h4>
        <h4>Nombre: {{nombre}}</h4>
        <button class="btn btn-success" @click="subNumeroPadre">+</button>
    </div>
    `,
    props: ['numero', 'subNumeroPadre'],
    data(){
        return {
            nombre:'luijo'
        }
    },
    mounted() {

        this.$emit('nombreHijo', this.nombre)

    },
})