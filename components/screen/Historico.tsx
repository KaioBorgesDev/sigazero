import { useThemeColor } from '@/hooks/useThemeColor';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {StyleSheet, View, Text} from 'react-native'


interface Historico{
    ID: string,
    PERIODO: string,
    MEDIA: string,
    FREQUENCIA: string,
    STATUS: string
}

interface HistoricoProps{
    uuid: string | null
}
const Historico: React.FC<HistoricoProps> = ({uuid}) => {
    const backgroundColor = useThemeColor({ light: '#101010', dark: '#f0f0f0' }, 'background');
  const token = "d6ae5d9bcb7e4885517c3f60cf11da66";
  const [historicos, setHistorico] = useState<Historico[]>([])

  useEffect( ()=>{
    const buscarHistorico = async () => {
      try
      {
        const resposta = await axios.get(`http://192.168.1.206:80/api/historico/all?uid=${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const dados : Historico[] = await resposta.data;
        setHistorico(dados)
      }catch(error){
        console.log(error)
      }
    }
    buscarHistorico();
  }, [uuid])


  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: backgroundColor }]}>Historico</Text>
      <View style={styles.listaDisciplinas}>
        {historicos.length > 0 ? (
          historicos.map((historico) => (
            <View key={historico.ID} style={styles.item}>
              <Text style={styles.id}>{historico.ID} - Periodo: {historico.PERIODO}</Text>

              {historico.STATUS === 'Aprovado por Nota e Frequência' ? (<Text style={styles.aprovado}>{historico.STATUS}</Text>) :(<Text style={styles.reprovado}></Text>)}
              <Text style={styles.listaDisciplinas}>Nota: {historico.MEDIA}</Text>
              <Text style={styles.aprovado}>Frequência:{historico.FREQUENCIA}</Text>
            </View>
          ))
        ) : (
          <Text>Nenhum Historico encontrado</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listaDisciplinas: {
    width: '100%',
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  id: {
    fontWeight: 'bold',
  },
  aprovado: {
    fontWeight: 'bold',
    marginTop: 5,
    color: 'green'
  },
  reprovado: {
    fontWeight: 'bold',
    marginTop: 5,
    color: 'red'
  },
});

export default Historico