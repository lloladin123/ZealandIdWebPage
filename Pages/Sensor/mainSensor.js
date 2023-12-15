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
                    SensorId: this.newSensor.sensorId,
                    Navn: this.newSensor.navn,
                    // Include other properties if needed
                });
        
                // Assuming the response includes the added sensor
                const newSensor = response.data;
        
                // Add the new sensor to the list
                this.sensorsList.push(newSensor);
        
                // Clear the input field
                this.newSensor = {
                    sensorId: "", // Clear sensorId as well
                    navn: "",
                    // Clear other properties if needed
                };
        
                // Log to update list (for testing)
                console.log('Updated sensor list:', this.sensorsList);
        
                // Fetch the updated list
                this.fetchSensors();
        
                // Close the modal
                const createModal = new bootstrap.Modal(document.getElementById('createModal'));
                createModal.hide();
            } catch (error) {
                console.error('Error adding sensor:', error);
                console.log('Error response data:', error.response.data);
            }
        },
        async deleteSensor() {
            try {
                console.log('Deleting Sensor with ID:', this.sensorIdToDelete);
                if (!this.sensorIdToDelete) {
                    console.error('Please provide a valid Sensor ID to delete.');
                    return;
                }
                const deleteUrl = `${baseUrl}/${this.sensorIdToDelete}`;
                const response = await axios.delete(deleteUrl);
                console.log('Response from the server:', response.data);
                this.fetchSensors();
                this.sensorIdToDelete = '';

                // Close the delete modal after successful deletion
                const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
                deleteModal.hide();
            } catch (error) {
                console.error('Error deleting Sensor:', error);
            }
        },
        async handleSearch() {
            // Filter sensorsList based on the search query and searchBy
            if(!this.searchQuery.trim()) {
                await this.fetchSensors();
                return;
            }
        
            const query = this.searchQuery.toLowerCase();
            this.sensorsList = this.sensorsList.filter(sensor => {
                const searchTerm = sensor.navn.toString().toLowerCase(); // Assuming you want to search by sensor name
                return searchTerm.includes(query);
            });
        },                 
    },
    mounted() {
        this.fetchSensors();
    },
});

// Mount the app to the root element with id="app"
app.mount("#app");
