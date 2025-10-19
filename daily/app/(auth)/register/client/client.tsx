import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AppText } from '@/components/text/appText';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormRegisterAndLogin } from '../../styles/FormRegisterAndLogin';
import { useRegister } from '@/context/ClienteRegisterContext';
import { RadioButton } from 'react-native-paper';

const schema = yup
  .object()
  .shape({
    nome: yup.string().required('Informe seu nome'),
    cpf: yup.string().required('Informe seu CPF'),
    telefone: yup.string().required('Informe seu telefone'),
    genero: yup.string().required('Informe seu gênero'),
  })
  .required();

export default function Client() {
  const router = useRouter();
  const { updateForm } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: '',
      cpf: '',
      telefone: '',
      genero: '',
    },
  });

  const onSubmit = (data: any) => {
    updateForm(data);
    console.log('Dados enviados:', data);
    router.push('/(auth)/register/client/clientAddres');
  };

  return (
    <KeyboardAvoidingView
      style={FormRegisterAndLogin.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: 20,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={FormRegisterAndLogin.container}>
          <AppText weight="semi" size={18} style={FormRegisterAndLogin.subtitle}>
            Dados pessoais
          </AppText>

          {errors.nome && <Text style={FormRegisterAndLogin.error}>{errors.nome.message}</Text>}
          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={FormRegisterAndLogin.input}
                placeholder="Nome"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#888"
              />
            )}
          />

          {errors.cpf && <Text style={FormRegisterAndLogin.error}>{errors.cpf.message}</Text>}
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={FormRegisterAndLogin.input}
                placeholder="CPF"
                value={value}
                onChangeText={onChange}
                placeholderTextColor="#888"
              />
            )}
          />

          {errors.telefone && <Text style={FormRegisterAndLogin.error}>{errors.telefone.message}</Text>}
          <Controller
            control={control}
            name="telefone"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={FormRegisterAndLogin.input}
                placeholder="Telefone"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                placeholderTextColor="#888"
              />
            )}
          />

          <AppText weight="bold" size={16} style={{ marginBottom: 8 }}>
            Gênero
          </AppText>

          <Controller
            control={control}
            name="genero"
            render={({ field: { onChange, value } }) => (
              <RadioButton.Group onValueChange={onChange} value={value}>
                <View style={FormRegisterAndLogin.genderView}>
                  <View style={FormRegisterAndLogin.genderViewIntern}>
                    <RadioButton value="Masculino" />
                    <AppText>Masculino</AppText>
                  </View>

                  <View style={FormRegisterAndLogin.genderViewIntern}>
                    <RadioButton value="Feminino" />
                    <AppText>Feminino</AppText>
                  </View>

                  <View style={FormRegisterAndLogin.genderViewIntern}>
                    <RadioButton value="Outro" />
                    <AppText>Outro</AppText>
                  </View>
                </View>
              </RadioButton.Group>
            )}
          />

          <TouchableOpacity style={FormRegisterAndLogin.button} onPress={handleSubmit(onSubmit)}>
            <AppText weight="bold" size={16} color="#fff">
              Próximo
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}