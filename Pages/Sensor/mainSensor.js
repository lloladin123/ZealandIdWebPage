const baseUrl = "https://zealandidscanner.azurewebsites.net/api/sensors";

const app = Vue.createApp({
    data() {
        return {
            sensorsList: [],
            newSensor: {
                Navn: "", // Provide a value for SensorNavn
                SensorId: "", // Provide a value for SensorId
            },
            sensorIdToDelete: "", // Initialize sensorIdToDelete
        };
    },
    methods: {
        async fetchSensors() {
            try {
                const response = await axios.get(baseUrl);
                this.sensorsList = response.data;
            } catch (error) {
                console.error('Error fetching Sensors:', error);
            }
        },
        async addSensor() {
            try {
                // Make a POST request to create a new sensor
                const response = await axios.post(baseUrl, {
                    SensorId: this.newSensor.sensorId, // Include the sensorId
                    Navn: this.newSensor.navn,
                    // Include other properties if needed
                });
        
                // Assuming the response includes the added sensor
                const newSensor = response.data;
        
                // Add the new sensor to the list
                this.sensorsList.push(newSensor);
        
                // Clear the input field
                this.newSensor = {
                    navn: "",
                    // Clear other properties if needed
                };
        
                // Log to update list (for testing)
                console.log('Updated sensor list:', this.sensorsList);
            } catch (error) {
                console.error('Error adding sensor:', error);
                console.log('Error response data:', error.response.data);
            }
        },          
          async deleteSensor() {
            try {
              // Make a DELETE request to delete the sensor
              const response = await axios.delete(`${baseUrl}/${this.sensorIdToDelete}`);
          
              // Log the response for debugging
              console.log('Delete Sensor Response:', response);
          
              // Assuming the response indicates successful deletion
              // Remove the sensor from the local list
              this.sensorsList = this.sensorsList.filter(sensor => sensor.sensorId !== this.sensorIdToDelete);
          
              // Clear the input field
              this.sensorIdToDelete = "";
          
              // Log to update list (for testing)
              console.log('Updated sensor list:', this.sensorsList);
          
              // Close the modal
              const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
              deleteModal.hide();
            } catch (error) {
              console.error('Error deleting sensor:', error);
              console.log('Error response data:', error.response.data);
            }
        }                             
    },
    mounted() {
        this.fetchSensors();
    },
});

// Mount the app to the root element with id="app"
app.mount("#app");
