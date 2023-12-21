const serverUrl = 'http://localhost:9090';

export default {
  async handleLogin(username, password) {
    try {
        const { token, userId } = await this.loginRequest(username, password);
      
        localStorage.setItem('token', token);

        const userData = await this.getUserData(userId, token);
        console.log('User Data:', userData);

        return {
            id: userId,
            username: userData.username,
        };

    } catch (error) {
        console.error("Error fetching:", error);
    }
  },

  async handleSignup(username, password) {
    try {
      await this.signupRequest(username, password);
      await this.handleLogin(username, password);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  },

  async loginRequest(username, password) {
    const loginResponse = await fetch(`${serverUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!loginResponse.ok) {
      throw new Error(`Login failed with status: ${loginResponse.status}`);
    }
    const json = await loginResponse.json();
    return json
  },

  async signupRequest(username, password) {
    const signupResponse = await fetch(`${serverUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!signupResponse.ok) {
      throw new Error(`Signup failed with status: ${signupResponse.status}`);
    }
  },

  async getUserData(userId) {
    const token = localStorage.getItem("token");

    const userResponse = await fetch(`${serverUrl}/users/${userId}?token=${token}`);

    if (!userResponse.ok) {
      throw new Error(`Failed to get user data with status: ${userResponse.status}`);
    }

    return userResponse.json();
  },

  async saveUserData() {
    //Needs to be implemented.
  }
};
