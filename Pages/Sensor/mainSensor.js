const app = Vue.createApp({

    data() {
      return {
        sensorList: [], // Empty array of lokaler
        newSensor: "", // Store the value of a new lokale
      };
    },
  
    methods: {
     
       /* handleAddItem() {
            this.lokalerList.push(this.newLokale); // Add new lokale to list
            this.newLokale = "";                   // Clear text block

            // Log to update list (for testing)
            console.log('Updated lokaler list:', this.lokalerList);
        },*/

        async addSensor() {
            try {
                // Make a POST request to your backend API to add a new lokale
                const response = await axios.post('http://127.0.0.1:5000/sensor', {
                    name: this.newSensor,
                });

                // Assuming the response includes the added lokale with an ID
                const newSensor = response.data;
                this.sensorList.push(newSensor);

                // Clear the input field
                this.newSensor = '';

                // Log to update list (for testing)
                console.log('Updated sensor list:', this.sensorList);
            }   catch (error) {
                console.error('Error adding sensor:', error);
            }
        },
    },
});
  
// Mount the app to the root element with id="app" 
app.mount("#app");
  