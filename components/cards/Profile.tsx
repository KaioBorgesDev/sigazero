import { useThemeColor } from '@/hooks/useThemeColor'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

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
                const resposta = await axios(`http://192.168.1.6:80/api/aluno/all?uid=${uuid}`, {
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
        <Image
          source={{
            uri: `${profile?.FOTO_URL}`
          }}
          style={styles.userImage}/>
          <Text style={[styles.title, {color: backgroundColor}]}>{profile?.NOME}</Text>
        </View>
        <View style = {styles.item}>
        <Text  style={[styles.title]}>{profile?.CURSO} - {profile?.CICLO}° Semestre ({profile?.TURNO})</Text>
        <Text  style={[styles.campus]}>{profile?.FATEC_UNIDADE}</Text>
        <Text  style={[styles.title]}>{}</Text>
        <Text  style={[styles.title]}></Text>
        </View>
      </View>
    
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "space-between",
      marginEnd: 10
    },

    title: {
      textAlign: 'center',
      fontSize: 15,
      marginBottom: 20,
      fontWeight: 'bold'
    },
    campus: {
      textAlign: 'center',
      fontSize: 15,
      marginBottom: 20,
    },
    item: {
      marginBottom: 10,
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    descricao: {
      fontWeight: 'bold',
    },
  
    userImage: {
        height: 90,
        width: 90,
        borderWidth: 1,
        margin: 10,
        borderColor: 'white', 
      },
  });

export default Profile