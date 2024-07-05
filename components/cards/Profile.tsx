import { useThemeColor } from '@/hooks/useThemeColor'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

interface Profile{
    uuid: string,
}

interface ProfileProps{
    uuid: string,
}
const Profile: React.FC<ProfileProps> = ({uuid}) => {
    const backgroundColor = useThemeColor({ light: '#101010', dark: '#f0f0f0' }, 'background');
    const [profile, setProfile] = useState<Profile>();
    const token = "d6ae5d9bcb7e4885517c3f60cf11da66";
    

  return (
    <View style = {styles.container}>
        
        <Text style={styles.title}>Ola</Text>
        <Image
        source={require('@/assets/images/react-logo.png')}
        style={styles.userImage}
      />
      
        

    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      padding: 0,
      alignItems: 'center'
    },
    title: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
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
    media: {
      fontSize:15,
      marginTop: 5,
    },
    mediaBold:{
      fontSize:20,
      fontWeight: 'bold'
    },
    prova: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#e9e9e9',
      borderRadius: 5,
    },
    provaId: {
      fontWeight: 'bold',
    },
    provaData: {
      marginTop: 5,
    },
    avaliacao: {
      marginTop: 5,
    },
    userImage: {
        height: 100,
        width: 100,
        
      },
  });

export default Profile