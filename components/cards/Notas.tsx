import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View} from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import axios from 'axios';
import { ThemedText } from '../ThemedText';
import { format } from 'date-fns';


interface Avaliacao {
  ACD_PlanoEnsinoAvaliacaoParcialNota: number;
  ACD_PlanoEnsinoAvaliacaoParcialDataLancamento: string;
}

interface Prova {
  ID: string;
  DATA: string;
  AVALIACAO: Avaliacao[];
}

interface Nota {
  ID: string;
  DESCRICAO: string;
  MEDIA: number;
  PROVAS: Prova[];
}

interface NotasProps{
  uuid: string
}

const Notas: React.FC<NotasProps> = ({uuid}) => {
  const backgroundColor = useThemeColor({ light: '#101010', dark: '#f0f0f0' }, 'background');
  const token = "d6ae5d9bcb7e4885517c3f60cf11da66";
  const [notas, setNotas] = useState<Nota[]>([])

  useEffect( ()=>{
    const buscarNotas = async () => {
     
      try
      {
        const resposta = await axios.get(`http://192.168.1.6:80/api/notas/all?uid=${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const dados: Nota[] = resposta.data;
        setNotas(dados)
      }catch(error){
        console.log(error)
      }
    }
    buscarNotas();
  }, [uuid])

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: backgroundColor}]}>Notas Parciais</Text>
      {notas.map((nota) => (
        <View key={nota.ID} style={styles.item}>
          <Text style={styles.descricao}>{nota.DESCRICAO}</Text>
          <Text style={styles.media}>Sua média: <Text style={styles.mediaBold}>{nota.MEDIA}</Text>
          </Text>
            {nota.PROVAS.map((prova) => (
            <View key={prova.ID} style={styles.prova}>
              <Text style={styles.provaId}>Avaliação: {prova.ID}</Text>
              <Text style={styles.provaData}>Data da Prova: { prova.DATA == "0000-00-00T00:00:00" ? "Não declarado." : 
              format(new Date(prova.DATA), 'dd/MM/yyyy')}</Text>
              {prova.AVALIACAO.map((avaliacao, index) => (
                <View key={index} style={styles.avaliacao}>
                  <Text style={styles.media}>Nota: <Text style={[styles.media, {fontWeight: 'bold'}]}>{avaliacao.ACD_PlanoEnsinoAvaliacaoParcialNota}</Text></Text>
                  <Text>Data de Lançamento: {avaliacao.ACD_PlanoEnsinoAvaliacaoParcialDataLancamento}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
});
export default Notas