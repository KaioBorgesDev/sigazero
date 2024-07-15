import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useThemeColor } from '@/hooks/useThemeColor';

interface Disciplina {
  ID: string;
  DESCRICAO: string;
}

interface DisciplinasProps {
  uuid: string | null;
}

const Disciplinas: React.FC<DisciplinasProps> = ({ uuid }) => {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = "d6ae5d9bcb7e4885517c3f60cf11da66";

  useEffect(() => {
    const buscarDisciplina = async () => {
      try {
        if (uuid) {
          console.log(uuid, "O uuid chegou");
          const resposta = await axios.get(`http://192.168.1.206:80/api/disciplinas/all?uid=${uuid}`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
            timeout: 10000
          });
          console.log('Resposta da API:', resposta.data);
          const dados: Disciplina[] = resposta.data;
          setDisciplinas(dados);
        } else {
          console.log("UUID não está disponível");
        }
      } catch (error) {
        console.log("Erro na requisição:", error);
        setError("Não foi possível realizar a requisição.");
      } finally {
        setLoading(false);
      }
    };

    buscarDisciplina();
  }, [uuid]);

  const backgroundColor = useThemeColor({ light: '#101010', dark: '#f0f0f0' }, 'background');

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={backgroundColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: backgroundColor }]}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: backgroundColor }]}>Disciplinas</Text>
      <View style={styles.listaDisciplinas}>
        {disciplinas.length > 0 ? (
          disciplinas.map((disciplina) => (
            <View key={disciplina.ID} style={styles.item}>
              <Text style={styles.id}>{disciplina.ID}</Text>
              <Text style={styles.descricao}>{disciplina.DESCRICAO}</Text>
            </View>
          ))
        ) : (
          <Text>Nenhuma disciplina encontrada</Text>
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
  descricao: {
    marginTop: 5,
  },
});

export default Disciplinas;
