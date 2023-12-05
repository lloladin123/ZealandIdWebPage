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
        axios.post('', {
            username: this.username,
            password: this.password,
        })
        .then(response => {
            console.log(response.data.message);
        })
        .catch(error => {
            console.error('Login failed', error);
            this.loginfail = true;
            this.loginError = 'Invalid username or password';
        });
    },
},
});

app.mount("#app");