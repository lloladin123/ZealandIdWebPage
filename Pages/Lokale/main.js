const app = Vue.createApp({

    data() {
      return {
        lokalerList: [], // Empty array of lokaler
        newLokale: "", // Store the value of a new lokale
      };
    },
  
    methods: {
     
       /* handleAddItem() {
            this.lokalerList.push(this.newLokale); // Add new lokale to list
            this.newLokale = "";                   // Clear text block

            // Log to update list (for testing)
            console.log('Updated lokaler list:', this.lokalerList);
        },*/

        async addLokale() {
            try {
                // Make a POST request to your backend API to add a new lokale
                const response = await axios.post('http://127.0.0.1:5000/lokaler', {
                    name: this.newLokale,
                });

                // Assuming the response includes the added lokale with an ID
                const newLokale = response.data;
                this.lokalerList.push(newLokale);

                // Clear the input field
                this.newLokale = '';

                // Log to update list (for testing)
                console.log('Updated lokaler list:', this.lokalerList);
            }   catch (error) {
                console.error('Error adding lokale:', error);
            }
        },
    },
});
  
// Mount the app to the root element with id="app" 
app.mount("#app");
  