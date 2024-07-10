import ParallaxScrollView from '@/components/ParallaxScrollView';
import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, Image,View} from 'react-native'
import Notas from '@/components/cards/Notas';
import { ThemedText } from '@/components/ThemedText';
import storage from '@/utils/storage';

const notas = () => {
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const getUUID = async () => {
      try {
        const uid = await storage.getItem('uuid');
        if (uid !== null) {
          console.log(uid);
          setUid(uid);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getUUID();
  }, []);

    return (
     <>
     <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo_fatec_br.png')}
          style={styles.fatecLogo}
        />
      }>
      {uid && <Notas uuid={uid} />}

    </ParallaxScrollView>
        
     </>
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