<script>
import AuthViewModel from '@/viewmodels/AuthViewModel';

export default {
  data() {
    return {
      username: '',
      password: '',
      user: null,
      isLoggedIn: false,
    };
  },

  methods: {
    async handleLogin() {
      const userFound = await AuthViewModel.handleLogin(this.username, this.password);
      this.user = userFound;
      // Check if the login was successful and if a user object is returned
      if (this.user) {
        // Push the route to the user profile page with the user ID as a parameter
        this.$router.push({ name: 'UserProfile', params: { userId: this.user.id, userName: this.user.username } });
      } else {
        // Handle unsuccessful login
        console.error('Login failed');
      }
    },

    async handleSignup() {
      await AuthViewModel.handleSignup(this.username, this.password);
    },
    async goToHighscores(){      
      if (this.user) {
        // Push the route to the user profile page with the user ID as a parameter
        this.$router.push({ name: 'Highscores', params: { userId: this.user.id } });
      } else {
        // Handle unsuccessful login
        console.error('Login failed');
      }
    },
    async goToProfile(){      
      if (this.user) {
        // Push the route to the user profile page with the user ID as a parameter
        this.$router.push({ name: 'UserProfile', params: { userId: this.user.id } });
      } else {
        // Handle unsuccessful login
        console.error('Login failed');
      }
    },async handleLogOut(){      
      this.user = null
        this.$router.push("/");

    }

  }
};
</script>

<template>
  <div v-if="!this.user">
    <div>
      <label for="username">Username:</label>
      <input type="text" v-model="username" id="username">
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" v-model="password" id="password">
    </div>
    <button @click="handleLogin">Login</button>
    <button @click="handleSignup">Sign up</button>
  </div>
  <div v-else>
    <button @click="goToHighscores">Highscores</button>
    <button @click="goToProfile">Profile</button>
    <button @click="handleLogOut">Log out</button>
    <button @click="goToGame">Game</button>
  </div>
</template>