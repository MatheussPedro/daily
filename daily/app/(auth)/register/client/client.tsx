import { View, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { AppText } from '@/components/text/appText';
import { useCadastro } from '@/context/CadastroContext';
import { useState } from 'react';
import { FormRegisterAndLogin } from '@/app/styles/FormRegisterAndLogin';
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


const handleFinish = async () => {
  if (!cep || !rua || !numero || !bairro || !cidade || !uf) {
    alert('Preencha todos os campos obrigatórios');
    return;
  }

  const endereco = { rua, numero, bairro, cidade, uf, cep };

  const dadosCompletos = {
    ...data,
    endereco,
  };

  try {
    const res = await fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosCompletos),
    });

    if (!res.ok) {
      throw new Error('Erro ao salvar no banco');
    }

    const resposta = await res.json();
    console.log('Resposta da API:', resposta);

    alert('Cadastro salvo com sucesso!');
    router.push('/(auth)/welcome');
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    alert('Erro ao salvar. Tente novamente.');
  }
};

  return (
        <KeyboardAvoidingView
      style={FormRegisterAndLogin.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >

  <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}
      keyboardShouldPersistTaps="handled"
  >
      <View>
      <AppText size={18} weight="bold" style={FormRegisterAndLogin.subtitle}>
        Agora preciso que você preencha seus dados de endereço
      </AppText>

      <TextInput style={FormRegisterAndLogin.input} placeholder="CEP" value={cep} onChangeText={setCep} placeholderTextColor="#888" />
      <TextInput style={FormRegisterAndLogin.input} placeholder="Rua" value={rua} onChangeText={setRua} placeholderTextColor="#888" />
      <TextInput style={FormRegisterAndLogin.input} placeholder="Número" value={numero} onChangeText={setNumero} placeholderTextColor="#888" />
      <TextInput style={FormRegisterAndLogin.input} placeholder="Bairro" value={bairro} onChangeText={setBairro} placeholderTextColor="#888" />
      <TextInput style={FormRegisterAndLogin.input} placeholder="Cidade" value={cidade} onChangeText={setCidade} placeholderTextColor="#888" />
      <TextInput style={FormRegisterAndLogin.input} placeholder="UF" value={uf} onChangeText={setUf} maxLength={2} placeholderTextColor="#888" />

      <TouchableOpacity style={FormRegisterAndLogin.button} onPress={handleFinish}>
        <AppText weight="bold" size={16} color="#fff">Concluir cadastro</AppText>
      </TouchableOpacity>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
  );
}