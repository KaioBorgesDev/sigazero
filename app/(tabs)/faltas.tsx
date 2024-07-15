import ParallaxScrollView from '@/components/ParallaxScrollView';
import Faltas from '@/components/screen/Faltas';
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, Image} from 'react-native'
import storage from '../../utils/storage';

const notas = () => {
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const getUUID = async () => {
      try {
        const uid = await storage.getItem('uuid');
        if (uid !== null) {
          setUid(uid);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUUID();
  }, []);
    return (
     
      <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo_fatec_br.png')}
          style={styles.fatecLogo}
        />
      }>
      {uid && <Faltas uuid={uid}/>}
    </ParallaxScrollView>
  
      )
      
    }
    const styles = StyleSheet.create({
        titleContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        },
        stepContainer: {
          gap: 8,
          marginBottom: 8,
        },
        fatecLogo: {
          height: 108,
          width: 200,
          bottom: 0,
          left: 0,
          position: 'absolute',
        },
       
      });

export default notas