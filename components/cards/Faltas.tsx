import { useThemeColor } from '@/hooks/useThemeColor'
import axios from 'axios'
import { useEffect, useState } from 'react'
import {View, Text, StyleSheet} from 'react-native'


interface Falta{
    ID: string,
    DESCRICAO: string,
    FALTAS: number,
    PRESENCAS: number,
    TOTAL: number
}
interface Professores{
    ID: string,
    DESCRICAO: string,
    TURMA: string,
    NOME: number,

}

interface FaltasProps{
    uuid: string
}
const Faltas : React.FC<FaltasProps> = ({uuid}) => {
    const backgroundColor = useThemeColor({ light: '#101010', dark: '#f0f0f0' }, 'background');
    const [faltas, setFalta] = useState<Falta[]>([]);
    const [professor, setProfessor] = useState<Professores[]>([]);
    const token = "d6ae5d9bcb7e4885517c3f60cf11da66";
    

    useEffect(()=>{
        const buscarFaltas = async()=>{
            try{
                const resposta_faltas = await axios.get(`http://192.168.1.6:80/api/faltas/all?uid=${uuid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const resposta_professores = await axios.get(`http://192.168.1.6:80/api/professores/all?uid=${uuid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                const dados_faltas : Falta[] = resposta_faltas.data;
                setFalta(dados_faltas);

                const dados_professores : Professores[] = resposta_professores.data;
                setProfessor(dados_professores);

            }catch(error){
                console.log(error);
            }
        }
        buscarFaltas();
    }, [uuid])

  return (
    <View style={styles.container}>
        <Text style= {[styles.title, {color: backgroundColor}]}>Faltas Parciais</Text>
        {faltas.map((falta)=>{
        const prof_disciplina = professor.find(prof=> prof.ID == falta.ID)
        const desc = prof_disciplina?.DESCRICAO;
        const numberFromDesc = desc ? desc.match(/\d+/)?.[0] || "0" : "0";
        const cargaHoraria: { [key: string]: string } = {
            "2": "40",
            "4": "80",
            "6": "160",
        };
        

        
        return(
                <View key={falta.ID} style={styles.item}>
                <Text style={styles.titulo}>{falta.DESCRICAO}</Text>
                <Text style={styles.descricao}>{prof_disciplina?.NOME}</Text>
                <Text style={styles.descricao}>{numberFromDesc}/hr por Semana - {cargaHoraria[numberFromDesc]}/Aulas</Text>
                <Text style={styles.media}>Faltas: <Text style={styles.mediaBold}>{falta.FALTAS} Aulas</Text></Text>
                <Text style={styles.media}>Presença (%): <Text style={styles.mediaBold}>{Math.ceil((falta.PRESENCAS / falta.TOTAL) * 100)}%</Text></Text>
                <Text style={styles.media}>Aulas Dadas: <Text style={styles.mediaBold}>{falta.TOTAL} Aulas</Text></Text>
                
        </View>
        )
    })}
    </View>
  )
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    padding: 10,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  media: {
    textAlign: 'center',
    fontSize:15,
    marginTop: 5,
    marginBottom: 5,
  },
  mediaBold:{
    fontSize:15,
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

export default Faltas