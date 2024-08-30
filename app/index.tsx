import {View, Text, TextInput, Pressable, StyleSheet, Image} from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useState } from 'react';
import storage from '../utils/storage';
import { useRouter } from 'expo-router';
import axios from 'axios';


const Login = () => {
  const backgroundColor = useThemeColor({ light: '#f0f0f0', dark: '#101010' }, 'background');
  
  const [cpf, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const inserirCrendenciais = async () => {
    if(cpf && password){
      const formData = new FormData();
      formData.append('id',cpf);
      formData.append('password',password);

      try{
        const req = await axios.post(`http://192.168.1.7:80/api/session/create`, formData, {
            headers: {'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer d6ae5d9bcb7e4885517c3f60cf11da66'}
    })

      const resposta = req.data.session_id;
      alert(req.data.message);
      //preciso fazer uma requisicao pra ver se o usuario é valido, caso seja, eu libero a entrada, nao apenas a a session criada, ja que nao valida o usuario
      if(resposta){
        storage.setItem('uuid', resposta);
        router.push('/home')
      }
        
        
    }catch(e){
      console.log(e);
    }
  }
}
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo_fatec_br.png')}
          style={styles.fatecLogo}
        />
      }>

<View style = {styles.container}> 
  <View style={styles.cardLogin}>
  <Text style={[styles.title]}>Login</Text>
  <TextInput placeholder= 'CPF' style={[styles.textBox]} onChangeText={setCPF}
  value={cpf}>
  </TextInput>
  
  {/*criar uma funcao que caso o bacana, ja tenha um uuid no dispositivo, entre direto, usando useEffect*/}
  <TextInput placeholder= 'Senha' style={[styles.textBox]}
  value= {password} 
  secureTextEntry={true}
  onChangeText={setPassword}></TextInput>

  {/*//aqui eu preciso colocar um background color de outra cor, e que seja adapitavel*/}
      <Pressable
          style={({ pressed }) => [
            {
              height: 40,
              width: 150,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#ccc',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: pressed ? backgroundColor : 'bege', // Altera a cor de fundo quando pressionado
            },
            styles.btnLogin,
            {color: backgroundColor}
            // Estilos adicionais
          ]}
          onPress={inserirCrendenciais}> 
          <Text style={styles.textBtnLogin}>Entrar</Text>
        </Pressable>
      </View>
    </View>
      </ParallaxScrollView>
   
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  fatecLogo: {
    height: 108,
    width: 200,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 40,
    fontWeight: 'bold'
  },
  campus: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 15,
  },
  item: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cardLogin: {
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center',
    alignItems: 'center',
  },
    btnLogin: {
      margin: 10, 
    },
    textBtnLogin: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    textBox:{
      margin: 10,
      backgroundColor: '#FFF',
      height: 40,
      width: 300,
      maxWidth: 800,
      borderRadius: 12,
      paddingLeft: 20
    }
})
export default Login