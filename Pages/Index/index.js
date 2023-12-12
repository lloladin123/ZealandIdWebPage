const app = Vue.createApp({
  data() {
      return {
          username: '',
          password: '',
          loginError: '',
          loginfail: false,
      };
  },
  methods: {
    login() {
        // Login is for testing purposes

        const testUsername = 'admin'
        const testPassword = 'password'

        if (this.username === testUsername && this.password === testPassword) {
            // Simulate a successful login
            console.log('Login successful');

            // Redirect to Forside.html
            window.location.href = '/Pages/Forside/Forside.html';

        } else {
            // Simulate a failed login
            console.error('Login failed');
            this.loginfail = true;
            this.loginError = 'Forkert brugernavn eller adgangskode'
        }


        /*axios.post('', {
            username: this.username,
            password: this.password,
        })
        .then(response => {
            console.log(response.data.message);
        })
        .catch(error => {
            console.error('Login failed', error);
            this.loginfail = true;
            this.loginError = 'Forkert brugernavn eller adgangskode';
        }); */
    }, 
},
});

app.mount("#app");