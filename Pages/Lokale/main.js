const baseUrl = "https://zealandidscanner.azurewebsites.net/api";
const sensorsUrl = `${baseUrl}/sensors`; // Update this with the correct path to your sensors API
const lokalerUrl = `${baseUrl}/lokale`;

const app = Vue.createApp({
    data() {
        return {
            lokalerList: [],
        };
    },
    methods: {
        async fetchLokaler() {
            try {
                const response = await axios.get(lokalerUrl);
                this.lokalerList = response.data;
            } catch (error) {
                console.error('Error fetching Lokaler:', error);
            }
        },
        async handleSearch() {
            // Filter sensorsList based on the search query and searchBy
            if(!this.searchQuery.trim()) {
                await this.fetchLokaler();
                return;
            }
        
            const query = this.searchQuery.toLowerCase();
            this.lokalerList = this.lokalerList.filter(lokal => {
                const searchTerm = lokal.navn.toString().toLowerCase(); // Assuming you want to search by sensor name
                return searchTerm.includes(query);
            });
        },
        // Add other methods as needed
    },
    mounted() {
        this.fetchLokaler();
    },
});

// Mount the app to the root element with id="app"
app.mount("#app");
