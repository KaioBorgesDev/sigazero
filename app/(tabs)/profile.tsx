import ParallaxScrollView from '@/components/ParallaxScrollView'
import Profile from '@/components/cards/Profile'
import React from 'react'
import { Text, StyleSheet, Image} from 'react-native'
const profile = () => {
  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    headerImage={
      <Image
        source={require('@/assets/images/logo_fatec_br.png')}
        style={styles.fatecLogo}
      />
    }>
    
    <Profile uuid={"cf6bdc9432651aab8cdcab6cd121ec@qztiUKW9yC8mJnt1+3ej4qe4CNQ08OCXQu64ZoLU"}></Profile>
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
export default profile