import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const accessToken = await AsyncStorage.getItem(this.namespace);
    return accessToken ? JSON.parse(accessToken) : null;
  }

  async setAccessToken(accessToken) {
    // Add the access token to the storage
    if (accessToken) {
      await AsyncStorage.setItem(
        `${this.namespace}`,
        JSON.stringify(accessToken)
      );
    }
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(this.namespace);
  }
}

export default AuthStorage;
