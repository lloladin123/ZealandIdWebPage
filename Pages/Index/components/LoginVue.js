var app = new Vue({
  el: "#app",
  
  data: {
     registerActive: false,
     Usernamelogin: "",
     passwordLogin: "",
     usernameReg: "",
     passwordReg: "",
     confirmReg: "",
     emptyFields: false
  },
  
  methods: {
     doLogin() {
        if (this.Usernamelogin === "" || this.passwordLogin === "") {
           this.emptyFields = true;
        } else {
           alert("You are now logged in");
        }
     },
     
     doRegister() {
        if (this.usernameReg === "" || this.passwordReg === "" || this.confirmReg === "") {
           this.emptyFields = true;
        } else {
           alert("You are now registered");
        }
     }
  }
});