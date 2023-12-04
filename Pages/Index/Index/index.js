const app = Vue.createApp({
  el: '#app',
  data() {
    return {
      username: '',
      password: '',
      loginError: null,
    };
  },
    methods: {
        login() {
          this.loginError = null;
          if (this.username === 'example' && this.password === 'password') {
            alert('Login successful!');
          } else {
            this.loginError = 'Invalid username or password';
          }
        },
      },
}).mount("#app")