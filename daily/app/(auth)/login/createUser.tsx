import { AppText } from '@/components/text/appText';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, TouchableOpacity, Text, View, KeyboardAvoidingView, ScrollView, Platform, Image, Alert } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { router } from 'expo-router';
import { styles } from './styles/createUsersStyle';
import { useUser } from '@/context/UserContext';


const schema = yup.object().shape({
  email: yup.string().required('Informe seu email'),
  pass: yup.string().required('Digite sua senha.'),
  confirmpass: yup.string()
    .required('Confirme sua senha')
    .oneOf([yup.ref('pass')], 'As senhas devem ser iguais'),
}).required();

export default function Client() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const { setUser } = useUser();


  const onSubmit = async (data: any) => {
    try{
      const response = await fetch('http://10.0.0.212:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();

      if (response.ok) {
        console.log('Usuário criado:', result);
        const createdUser = result.user ?? result;
        if (createdUser && createdUser.id) {
          setUser({ id: createdUser.id, email: createdUser.email, tipo: createdUser.tipo, name: createdUser.name });
        }
        router.push('/(auth)/welcome');
      } else {
        alert(result.error || 'Erro ao criar usuário.');
      }
    }catch(error){
      console.log('Erro ao conectar', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Olá!</Text>
          <Text style={styles.subtitle}>Bem Vindo Ao App Daily</Text>
        </View>

        <View style={styles.formContainer}>
          <AppText weight="semi" size={18} style={styles.formTitle}>
            Crie sua conta
          </AppText>

          {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={value}
                onChangeText={onChange}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#888"
              />
            )}
          />

          {errors.pass && <Text style={styles.error}>{errors.pass.message}</Text>}
          <Controller
            control={control}
            name="pass"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#888"
              />
            )}
          />

          {errors.confirmpass && <Text style={styles.error}>{errors.confirmpass.message}</Text>}
          <Controller
            control={control}
            name="confirmpass"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Confirme sua senha"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#888"
              />
            )}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <AppText weight="bold" size={16} color="#fff">
              Cadastrar
            </AppText>
          </TouchableOpacity>

          <Text style={styles.bottomText}
          onPress={() => router.push('/(auth)/login/login')}>
            Já tem uma conta? <Text style={styles.link}>Entrar</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
