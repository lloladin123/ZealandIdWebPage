import AddLokale from './Lokale/AddLokale.vue';

var app = new Vue({
    el: "#app", // ID of your root HTML element


    components: {
        AddLokale,
    },

    methods: {
        addItem() {
            // Logic goes here
            console.log('Item added');
        },
    },

});