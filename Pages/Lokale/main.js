const app = Vue.createApp({

    data() {
      return {
        lokalerList: [], // Empty array of lokaler
        newLokale: "", // Store the value of a new lokale
      };
    },
  
    methods: {
      handleAddItem() {
        this.lokalerList.push(this.newLokale); // Add new lokale to list
        this.newLokale = "";                   // Clear text block

        // Log to update list (for testing)
        console.log('Updated lokaler list:', this.lokalerList);
        },

        /* handleEnterKey() {
        // Trigger the button click when the Enter key is pressed
        this.handleAddItem();
        }, */


    },

});
  
// Mount the app to the root element with id="app" 
app.mount("#app");
  