import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AppText } from '@/components/text/appText';
import { useCadastro } from '@/context/CadastroContext';
import { useState } from 'react';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

export default function ClientAddres() {
  const router = useRouter();
  const { data, setData } = useCadastro();

  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');

// console.log("Dados recebidos: ", data);

const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) return null;


  const handleFinish = () => {
    // if (!cep || !rua || !numero || !bairro || !cidade || !uf) {
    //   alert('Preencha todos os campos obrigatórios');
    //   return;
    // }

    setData({
      endereco: `${rua}, ${numero} - ${bairro}, ${cidade} - ${uf}, ${cep}`,
    });

    // Aqui você pode chamar a API ou ir para a tela de confirmação
    console.log('Cadastro completo:', data);
    alert('Cadastro salvo!');
    router.push('/(auth)/welcome');
  };



  return (
    <View style={styles.container}>
      <AppText size={18} weight="bold" style={styles.subtitle}>
        Agora preciso que você preencha seus dados de endereço
      </AppText>

      <TextInput style={styles.input} placeholder="CEP" value={cep} onChangeText={setCep} placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Rua" value={rua} onChangeText={setRua} placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Número" value={numero} onChangeText={setNumero} placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Bairro" value={bairro} onChangeText={setBairro} placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Cidade" value={cidade} onChangeText={setCidade} placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="UF" value={uf} onChangeText={setUf} maxLength={2} placeholderTextColor="#888" />

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <AppText weight="bold" size={16} color="#fff">Concluir cadastro</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f6f6f6',
    color: '#222',
  },
  button: {
    width: '100%',
    backgroundColor: '#2a9d8f',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
});
