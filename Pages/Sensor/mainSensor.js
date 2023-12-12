const app = Vue.createApp({

    data() {
      return {
        sensorList: [], // Empty array of sensors
        newSensor: "", // Store the value of a new sensor
      };
    },
  
    methods: {
        async addSensor() {
            try {
                // Make a POST request to your backend API to add a new sensor
                const response = await axios.post('https://fu-recent-flask.azurewebsites.net/sensors', {
                    name: this.newSensor,
                });

                // Assuming the response includes the added sensor with an ID
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
  