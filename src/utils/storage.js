import AsyncStorage from '@react-native-async-storage/async-storage'
const KEY = 'elfs_user'

export const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(KEY, jsonValue)
  } catch (e) {
    // saving error
  }
}

export const getData = async (itemKey) => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEY)
    return jsonValue != null ? JSON.parse(jsonValue)[itemKey] : null
  } catch (e) {
    // error reading value
  }
}

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem(KEY)
  } catch (e) {
    // remove error
  }
}
