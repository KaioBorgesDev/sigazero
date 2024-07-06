import {View, Text, TextInput, Pressable, StyleSheet, Image} from 'react-native'
import { ExternalLink } from '../../components/ExternalLink'
import { useThemeColor } from '@/hooks/useThemeColor';
import ParallaxScrollView from '@/components/ParallaxScrollView';

const Login = () => {
  const backgroundColor = useThemeColor({ light: '#101010', dark: '#f0f0f0' }, 'background');
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
  <TextInput placeholder= 'CPF'style={[styles.textBox]}></TextInput>
  <TextInput placeholder= 'Senha' style={[styles.textBox]}></TextInput>
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
              backgroundColor: pressed ? '#C0C0C0' : backgroundColor, // Altera a cor de fundo quando pressionado
            },
            styles.btnLogin,
            {}
            // Estilos adicionais
          ]}
          onPress={() => {
            // Lógica para ação ao pressionar o botão
            console.log('Botão LoginbtnLogin pressionado');
          }}> 
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
      marginTop: 70, 
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