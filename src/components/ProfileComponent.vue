<script>
import AuthViewModel from '@/viewmodels/AuthViewModel';
export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
  return {
    username: null,
  };
},
async created() {
  try {
    const userData = await this.getUserData(this.userId);
    this.username = userData.username
    this.password = userData.password
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
},methods: {
  async getUserData() {
  const user = await AuthViewModel.getUserData(this.userId);
  return user
  },
  async saveUserData(){
    AuthViewModel.saveUserData(this.userId);
  }
}
};
</script>

<template>
    <div>
      <h1>User Profile</h1>
      <p>User ID: {{ userId }}</p>
      <p v-if="username">Username: {{ username }}</p>
      <p v-else>Username: None of your business.</p>
      <p v-if="password">Password: 
      <input v-if="password" type="password" v-model="password" />
      <v-else/>
      </p>
      <button v-if="username" @click="saveUserData">Save Changes</button>
      <v-else/>

    </div>
  </template>
  