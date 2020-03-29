Vue.component('saludo', {
    template:
        `
            <div> 
                <h3>{{saludo}}</h3>
                cdscscs
            </div> 
            `,
    data() {
        return {
            saludo: "hola mundo",
        }
    }
})