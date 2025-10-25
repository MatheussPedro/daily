import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AppText } from '@/components/text/appText';
import * as yup from 'yup';
import { FormRegisterAndLogin } from '../../styles/FormRegisterAndLogin';
import { useRegister } from '@/context/ClienteRegisterContext';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUser } from '@/context/UserContext';

const schema = yup
  .object()
  .shape({
    cep: yup.string().required('Informe seu CEP'),
    rua: yup.string().required('Informe sua rua'),
    numero: yup.string().required('Informe o número da casa'),
    bairro: yup.string().required('Informe seu bairro'),
    cidade: yup.string().required('Informe sua cidade'),
    uf: yup.string().length(2, 'UF deve ter 2 letras').required('Informe o UF'),
  })
  .required();

export default function ClientAddres() {
  const router = useRouter();
  const { formData, updateForm } = useRegister();
  const { user, setUser } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      cep: (formData as any)?.cep ?? '',
      rua: (formData as any)?.rua ?? '',
      numero: (formData as any)?.numero ?? '',
      bairro: (formData as any)?.bairro ?? '',
      cidade: (formData as any)?.cidade ?? '',
      uf: (formData as any)?.uf ?? '',
    },
  });

  
const onSubmit = async () => {
  if (!user?.id) {
    console.error('Usuário não encontrado no contexto');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/users/update-tipo', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.id,
        tipo: 'cliente',
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar o tipo do usuário');
    }

    const updatedUser = await response.json();
    setUser(updatedUser.user);

    console.log('Tipo atualizado com sucesso!');
    router.push('/');
  } catch (error) {
    console.error('Erro ao atualizar tipo do usuário:', error);
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
        <View style={FormRegisterAndLogin.container}>
          <AppText size={18} weight="bold" style={FormRegisterAndLogin.subtitle}>
            Agora preciso que você preencha seus dados de endereço
          </AppText>

          {(errors.cep as any)?.message && (
            <Text style={FormRegisterAndLogin.error}>{(errors.cep as any).message}</Text>
          )}
          <Controller
            control={control}
            name="cep"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={FormRegisterAndLogin.input}
                placeholder="CEP"
                value={value}
                onChangeText={onChange}
                keyboardType="number-pad"
                placeholderTextColor="#888"
              />
            )}
          />

          {(errors.rua as any)?.message && (
            <Text style={FormRegisterAndLogin.error}>{(errors.rua as any).message}</Text>
          )}
          <Controller
            control={control}
            name="rua"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={FormRegisterAndLogin.input}
                placeholder="Rua"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#888"
              />
            )}
          />

          {(errors.numero as any)?.message && (
            <Text style={FormRegisterAndLogin.error}>{(errors.numero as any).message}</Text>
          )}
          <Controller
            control={control}
            name="numero"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={FormRegisterAndLogin.input}
                placeholder="Número"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#888"
              />
            )}
          />

          {(errors.bairro as any)?.message && (
            <Text style={FormRegisterAndLogin.error}>{(errors.bairro as any).message}</Text>
          )}
          <Controller
            control={control}
            name="bairro"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={FormRegisterAndLogin.input}
                placeholder="Bairro"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#888"
              />
            )}
          />

          {(errors.cidade as any)?.message && (
            <Text style={FormRegisterAndLogin.error}>{(errors.cidade as any).message}</Text>
          )}
          <Controller
            control={control}
            name="cidade"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={FormRegisterAndLogin.input}
                placeholder="Cidade"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#888"
              />
            )}
          />

          {(errors.uf as any)?.message && (
            <Text style={FormRegisterAndLogin.error}>{(errors.uf as any).message}</Text>
          )}
          <Controller
            control={control}
            name="uf"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={FormRegisterAndLogin.input}
                placeholder="UF"
                value={value}
                onChangeText={(text) => onChange(text.toUpperCase())}
                maxLength={2}
                placeholderTextColor="#888"
              />
            )}
          />

          <TouchableOpacity style={FormRegisterAndLogin.button} onPress={handleSubmit(onSubmit)}>
            <AppText weight="bold" size={16} color="#fff">
              Concluir cadastro
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
