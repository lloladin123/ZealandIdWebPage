const app = Vue.createApp({

    data() {
      return {
        lokalerList: [], // Empty array of lokaler
        newLokale: "", // Store the value of a new lokale
      };
    },
  
    methods: {
        async updateLokale(updatedLokale) {
            try {
               // Make a PUT request to update the lokale on the backend
               const response = await axios.put('http://127.0.0.1:5000/lokaler/${updatedLokale.id}', {
                 name: updatedLokale.name, // Update with the new name
                 id: updatedLokale.id,// Update with the the id
               });
           
               // Assuming the response includes the updated lokale
               const updatedData = response.data;
               this.lokalerList.push(newLokale)
           
               // Update the lokale in the lokalerList
               this.lokalerList = this.lokalerList.map(lokale => {
                 if (lokale.id === updatedData.id) {
                   return updatedData;
                 }
                 return lokale;
               });
           
               // Log to update list (for testing)
               console.log('Updated lokaler list:', this.lokalerList);
            } catch (error) {
               console.error('Error updating lokale:', error);
            }
           },

        async addLokale() {
            try {
                // Make a POST request to your backend API to add a new lokale
                const response = await axios.post('https://fu-recent-flask.azurewebsites.net/lokaler', {
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
  