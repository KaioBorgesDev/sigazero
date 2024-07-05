import ParallaxScrollView from '@/components/ParallaxScrollView';
import React from 'react'
import { Text, StyleSheet, Image,View} from 'react-native'
import Notas from '@/components/cards/Notas';
import { ThemedText } from '@/components/ThemedText';

const notas = () => {
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
      <Notas uuid='cf6bdc9432651aab8cdcab6cd121ec@qztiUKW9yC8mJnt1+3ej4qe4CNQ08OCXQu64ZoLU'></Notas>

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