const brugerUrl = "https://zealandbrugerapi.azurewebsites.net/api/bruger";

const app = Vue.createApp({

    data() {
      return {
        adminList: [], // Empty array of admin
        newAdmin: {
          Id: 0,
          Admin: false,
          Brugernavn: "",
          Password: "",
        },
       
      };
    },
  
    methods: {

        async fetchAdmin() {
        try {
            const response = await axios.get(brugerUrl);
            this.adminList = response.data;
        } catch (error) {
            console.error('Error fetching Admins:', error);
        }
    },
        async updateAdmin(updatedAdmin) {
            try {
               // Make a PUT request to update the lokale on the backend
               const response = await axios.put('http://127.0.0.1:5000/lokaler/${updatedLokale.id}', {
                 name: updatedAdmin.name, // Update with the new name
                 id: updatedAdmin.id,// Update with the the id
               });
           
               // Assuming the response includes the updated admin
               const updatedData = response.data;
               this.adminList.push(newAdmin)
           
               // Update the admin in the adminList
               this.adminList = this.adminList.map(admin => {
                 if (admin.id === updatedData.id) {
                   return updatedData;
                 }
                 return admin;
               });
           
               // Log to update list (for testing)
               console.log('Updated admin list:', this.adminList);
            } catch (error) {
               console.error('Error updating admin:', error);
            }
           },

        async addAdmin() {
            try {
                // Make a POST request to your backend API to add a new admin
                const response = await axios.post('https://fu-recent-flask.azurewebsites.net/admins', {
                    name: this.newAdmin,
                });

                // Assuming the response includes the added admin with an ID
                const newAdmin = response.data;
                this.adminList.push(newAdmin);

                // Clear the input field
                this.newAdmin = '';

                // Log to update list (for testing)
                console.log('Updated admin list:', this.adminList);
            }   catch (error) {
                console.error('Error adding admin:', error);
            }
        },
            async handleSearch() {
              // Filter sensorsList based on the search query and searchBy
              if(!this.searchQuery.trim()) {
                  await this.fetchAdmins();
                  return;
              }
          
              const query = this.searchQuery.toLowerCase();
              this.adminList = this.adminList.filter(admin => {
                  const searchTerm = admin.navn.toString().toLowerCase(); // Assuming you want to search by sensor name
                  return searchTerm.includes(query);
              });
        },
    },
    mounted() {
      this.fetchAdmin();
  },
});
  
// Mount the app to the root element with id="app" 
app.mount("#app");