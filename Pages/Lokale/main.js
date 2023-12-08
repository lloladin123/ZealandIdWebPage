const app = Vue.createApp({

    data() {
      return {
        lokalerList: [], // your data
        newLokale: "", // store value of new item
      };
    },
  
    methods: {
      handleAddItem() {
        // add newlokale to list
        this.lokalerList.push(this.newLokale);

        this.newLokale = "";

        // Log updated list
        console.log('Updated lokaler list:', this.lokalerList);
      },
    },
  
});
  
// Mount the app to the root element with id="app" 
app.mount("#app");
  