import { TextInput, TouchableOpacity, Text, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React from 'react';
import { useCadastro } from '@/context/CadastroContext';
import { AppText } from '@/components/text/appText';
import { FormRegisterAndLogin } from '../../styles/FormRegisterAndLogin';

const opcoesServico = ['Limpeza', 'Passar Roupa', 'Cozinhar'];

const schema = yup.object().shape({
cpf: yup.string().when('typeDoc', {
  is: 'cpf',
  then: (schema) => schema.required('CPF é obrigatório'),
  otherwise: (schema) => schema.notRequired(),
}),
cnpj: yup.string().when('typeDoc', {
  is: 'cnpj',
  then: (schema) => schema.required('CNPJ é obrigatório'),
  otherwise: (schema) => schema.notRequired(),
}),
  typeDoc: yup.string().oneOf(['cpf', 'cnpj']).required(),
  telefone: yup.string().required('Telefone é obrigatório'),
  servico: yup
    .array()
    .of(yup.string())
    .min(1, 'Selecione ao menos um tipo de serviço')
    .required('Selecione ao menos um tipo de serviço'),
  precoHora: yup.number().required('Informe um valor por hora'),
  experiencia: yup.number().min(0, 'Mínimo 0 anos').required('Informe sua experiência'),
  observacao: yup.string().required('Conte um pouco sobre você'),
}).required();

export default function DailyComplement() {
  const router = useRouter();
  const { setData } = useCadastro();

  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      cpf: '',
      cnpj: '',
      typeDoc: 'cpf',
      telefone: '',
      servico: [],
      precoHora: 0,
      experiencia: 0,
      observacao: '',
    },
  });

  const typeDoc = watch('typeDoc');

  const onSubmit = (formData: any) => {
    setData(formData);
    console.log('Dados enviados:', formData);
    router.push('/(auth)/welcome');
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
          <AppText weight='semi' size={18} style={FormRegisterAndLogin.subtitle}>
            Preencha seus dados para criar sua conta de Diarista
          </AppText>

          {typeDoc === 'cpf' && (
            <>
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
                    keyboardType="number-pad"
                  />
                )}
              />
            </>
          )}

          {typeDoc === 'cnpj' && (
            <>
              {errors.cnpj && <Text style={FormRegisterAndLogin.error}>{errors.cnpj.message}</Text>}
              <Controller
                control={control}
                name="cnpj"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={FormRegisterAndLogin.input}
                    placeholder="CNPJ"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                  />
                )}
              />
            </>
          )}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <TouchableOpacity style={FormRegisterAndLogin.button} onPress={() => setValue('typeDoc', 'cpf')}>
              <Text style={{ color: '#fff' }}>CPF</Text>
            </TouchableOpacity>

            <TouchableOpacity style={FormRegisterAndLogin.button} onPress={() => setValue('typeDoc', 'cnpj')}>
              <Text style={{ color: '#fff' }}>CNPJ</Text>
            </TouchableOpacity>
          </View>

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

          {errors.servico && <Text style={FormRegisterAndLogin.error}>{errors.servico.message}</Text>}
          <Controller
            control={control}
            name="servico"
            render={({ field: { onChange, value = [] } }) => (
              <View style={FormRegisterAndLogin.checkboxContainer}>
                <Text style={FormRegisterAndLogin.checkboxLabel}>Selecione os serviços que você presta:</Text>
                {opcoesServico.map((opcao) => (
                  <TouchableOpacity
                    key={opcao}
                    style={FormRegisterAndLogin.checkboxOption}
                    onPress={() => {
                      if (value.includes(opcao)) onChange(value.filter((v) => v !== opcao));
                      else onChange([...value, opcao]);
                    }}
                  >
                    <Text style={[FormRegisterAndLogin.checkboxIcon, { color: value.includes(opcao) ? '#2a9d8f' : '#888' }]}>
                      {value.includes(opcao) ? '☑' : '☐'}
                    </Text>
                    <Text style={FormRegisterAndLogin.checkboxText}>{opcao}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />

          {errors.precoHora && <Text style={FormRegisterAndLogin.error}>{errors.precoHora.message}</Text>}
          <Controller
            control={control}
            name="precoHora"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={FormRegisterAndLogin.input}
                placeholder="Preço por hora (R$)"
                value={value !== undefined && !isNaN(value) ? String(value) : ''}
                onChangeText={(text) => {
                  const numericValue = text.replace(',', '.');
                  onChange(numericValue === '' ? '' : Number(numericValue));
                }}
                keyboardType="numeric"
                placeholderTextColor="#888"
              />
            )}
          />

          {errors.experiencia && <Text style={FormRegisterAndLogin.error}>{errors.experiencia.message}</Text>}
          <Controller
            control={control}
            name="experiencia"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={FormRegisterAndLogin.input}
                placeholder="Anos de experiência"
                value={value !== undefined && !isNaN(value) ? String(value) : ''}
                onChangeText={(text) => {
                  const parsed = parseInt(text, 10);
                  onChange(isNaN(parsed) ? '' : parsed);
                }}
                keyboardType="numeric"
                placeholderTextColor="#888"
              />
            )}
          />

          {errors.observacao && <Text style={FormRegisterAndLogin.error}>{errors.observacao.message}</Text>}
          <Controller
            control={control}
            name="observacao"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[FormRegisterAndLogin.input, { height: 80 }]}
                placeholder="Conte um pouco sobre você"
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={4}
                placeholderTextColor="#888"
              />
            )}
          />

          <TouchableOpacity style={FormRegisterAndLogin.button} onPress={handleSubmit(onSubmit)}>
            <AppText weight="bold" size={16} color="#fff">Finalizar</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}