import ParallaxScrollView from '@/components/ParallaxScrollView';
import Historico from '@/components/screen/Historico';
import storage from '@/utils/storage';
import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image} from 'react-native'

const historico = () => {
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
  }, [uid]);
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
     {uid && <Historico uuid={uid} />}

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

export default historico