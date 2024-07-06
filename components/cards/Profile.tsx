import { useThemeColor } from '@/hooks/useThemeColor'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'

interface Profile{
    NOME: string,
    REGISTRO_ACADEMICO: string,
    EMAIL: string,
    FATEC_UNIDADE: string,
    CURSO: string,
    TURNO: string,
    CICLO: number,
    FOTO_URL: string
}

interface ProfileProps{
    uuid: string,
}
const Profile: React.FC<ProfileProps> = ({uuid}) => {
    const backgroundColor = useThemeColor({ light: '#101010', dark: '#f0f0f0' }, 'background');
    const [profile, setProfile] = useState<Profile>();
    const token = 'd6ae5d9bcb7e4885517c3f60cf11da66';
    
    useEffect(()=>{
        const buscarPerfil = async () => {
            try{
                const resposta = await axios(`http://192.168.1.206:80/api/aluno/all?uid=${uuid}`, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });

                const dados : Profile = resposta.data;
                setProfile(dados);
            }catch(error){
              console.log(error)
            }
        }
        buscarPerfil();
    },[uuid])
    
  return (
    <View style = {styles.container}>
        
        <View style = {styles.header}>
          <Text style={[styles.title, {color: backgroundColor}]}>{profile?.NOME}</Text>
          <Text style={[styles.title, {color: backgroundColor}]}>RA: {profile?.REGISTRO_ACADEMICO}</Text>
          <Text style={[styles.campus]}></Text>
        </View>
        <View style = {styles.item}>
        <Text  style={[styles.title]}>{profile?.CURSO} - {profile?.CICLO}° Semestre ({profile?.TURNO})</Text>
        <Text style={[styles.campus]}>{profile?.FATEC_UNIDADE}</Text>
        <Text style={[styles.campus]}>{profile?.EMAIL}</Text>
        
        </View>
        <Pressable
            style={({ pressed }) => [
              {
                height: 40,
                width: 60,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#ccc',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: pressed ? '#C0C0C0' : backgroundColor, // Altera a cor de fundo quando pressionado
              },
              styles.btnSair,
              {}
              // Estilos adicionais
            ]}
            onPress={() => {
              // Lógica para ação ao pressionar o botão
              console.log('Botão Sair pressionado');
            }}> 
             <Text style={styles.textBtnSair}>Sair</Text>
          </Pressable>  
      </View>
    
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
    },
    header: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: "center",
      marginEnd: 0
    },

    title: {
      textAlign: 'center',
      fontSize: 25,
      marginBottom: 10,
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
    descricao: {
      fontWeight: 'bold',
    },
  
    userImage: {
        height: 50,
        width: 50,
        borderWidth: 1,
        margin: 10,
        borderColor: 'blue', 
      },
      btnSair: {
        marginTop: 10, 
      },
      textBtnSair: {
        fontSize: 16,
        fontWeight: 'bold', 
      },
  });

export default Profile