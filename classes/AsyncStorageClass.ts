import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "constant";

export class AsyncStorageClass {
  async storeData(value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(storageKey, jsonValue);
    } catch (e) {
      // saving error
    }

    console.log("Saved.");
  }

  async getData() {
    try {
      const jsonValue = await AsyncStorage.getItem(storageKey);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }

    console.log("Retrieved");
  }

  async removeValue() {
    try {
      await AsyncStorage.removeItem(storageKey);
    } catch (e) {
      // remove error
    }

    console.log("Removed.");
  }
}
