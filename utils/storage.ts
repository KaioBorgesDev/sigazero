import {Platform} from 'react-native'
import * as Secure from 'expo-secure-store'


const isWeb = Platform.OS === 'web'
const storage = {
    async setItem(key: string, value:string): Promise<void>{
        if(isWeb){
            localStorage.setItem(key, value)
            console.log(value, " salvado com sucesso")
        }else {
            await Secure.setItemAsync(key,value)
        }
    },
    async getItem(key: string): Promise<string | null> {
        if(isWeb){
            return localStorage.getItem(key);
        }else {
            return await Secure.getItemAsync(key)
        }
    },
    async removeItem(key: string): Promise<void>{
        if(isWeb){
            localStorage.removeItem(key)
        }else{
            await Secure.deleteItemAsync(key)
        }
    }
  
}

export default storage