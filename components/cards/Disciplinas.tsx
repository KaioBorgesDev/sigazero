
//imports
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import { useThemeColor } from '@/hooks/useThemeColor';


//declarando o tipo das variaveis
interface Disciplina {
  ID: string;
  DESCRICAO: string;
}

//declarando o tipo das variaveis
interface DisciplinasProps {
  uuid: string;
}
///isso foi utilizando o comando RAFCE do Snipets ES7-REACTSNIPTs, ele cria automaticamente a const, eu só alterei
///pra declarar o qual seria os dados que a funcao diciplinas entraria, enfim, isso é typescript....
const Disciplinas: React.FC<DisciplinasProps> = ({ uuid }) => {
  // Estado para armazenar as disciplinas
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  //token de autorizacao, sem este, pego seu ip e compro uma geladeira (faca o teste.). 
  const token = "d6ae5d9bcb7e4885517c3f60cf11da66";

  //Esta parte, é nova pra mim, 
  //este hooks basicamente é feito quando as dependências sao alteradas, quase uma analogia ao do while (bem podre a analogia),
  useEffect(() => {
    //uma funcao que busca asyncronicamente 
    const buscarDisciplina = async () => {
        //bloco try catch simples
      try {
        // Requisição GET usando axios para obter as disciplinas
        const resposta = await axios.get(`http://192.168.1.6:80/api/disciplinas/all?uid=${uuid}`, {
            //passo pelo header o token 
          headers: {
            Authorization: `Bearer ${token}`
          },
          //um tempo limite de 10s para ele conseguir trazer um dado, caso ultrapasse da erro 
          timeout: 10000
        });

        // Armazena os dados recebidos no estado de disciplinas
        const dados: Disciplina[] = resposta.data; // Dados são um array de Disciplina diretamente

        setDisciplinas(dados); // Define as disciplinas no estado
        
      } catch (error) {
        //explodo um erro pro usuario caso de erro! 
        alert("Não foi possível realizar a requisição." + error);
      }
    };

    buscarDisciplina(); // Chama a função para buscar as disciplinas ao montar o componente
  }, [uuid, token]); // Dependências do useEffect (executará novamente se uuid ou token mudarem)
   const backgroundColor = useThemeColor({ light: '#101010', dark: '#f0f0f0' }, 'background');

  return (
    //
    
    <View style={styles.container}>
      <Text style={[styles.title, {color: backgroundColor}]}>Disciplinas</Text>
      <View style={styles.listaDisciplinas}>
        {/* Renderiza cada disciplina dentro de um View */}
        {disciplinas.map((disciplina) => (
          <View key={disciplina.ID} style={styles.item}>
            <Text style={styles.id}>{disciplina.ID}</Text>
            <Text style={styles.descricao}>{disciplina.DESCRICAO}</Text>
          </View>
        ))}
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
  descricao: {
    marginTop: 5,
  },
});

export default Disciplinas;
