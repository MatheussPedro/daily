import { TextInput, TouchableOpacity, Text, View, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { useCadastro } from '@/context/CadastroContext';
import { AppText } from '@/components/text/appText';
import { FormRegisterAndLogin } from '@/app/styles/FormRegisterAndLogin';

const schema = yup.object().shape({
  cpf: yup.string().required('CPF é obrigatório'),
  servico: yup.string().required('Selecione ao menos um tipo de serviço'),
  observacao: yup.string().required('Conte um pouco sobre você'),
  telefone: yup.string().required('Telefone é obrigatório'),
//   cidade: yup.string().required('Cidade é obrigatória'),
//   disponibilidade: yup.string().required('Informe sua disponibilidade'),
  precoHora: yup.number().required('Informe um valor por hora'),
  experiencia: yup.number().min(0, 'Mínimo 0 anos').required('Informe sua experiência'),
}).required(); //<-- caso queira testar mais rapido basta remover a chamada dessa função required();

export default function dailyComplement(){

    const router = useRouter();
    const { setData } = useCadastro();

    const onSubmit = (formData: any) => {
        setData(formData);
        router.push('/');
    };

    const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    });

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

      {/* <Controller
        control={control}
        name="cidade"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={value}
            onChangeText={onChange}
            placeholderTextColor="#888"
          />
        )}
      />
      {errors.cidade && <Text style={styles.error}>{errors.cidade.message}</Text>} */}

    {errors.servico && <Text style={FormRegisterAndLogin.error}>{errors.servico.message}</Text>}
      <Controller
        control={control}
        name="servico"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={FormRegisterAndLogin.input}
            placeholder="Tipo de serviço (ex: Limpeza, Passar Roupa)"
            value={value}
            onChangeText={onChange}
            placeholderTextColor="#888"
          />
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
        const numericValue = text.replace(',', '.'); // Aceita vírgula como separador
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

      {/* <Controller
        control={control}
        name="disponibilidade"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Disponibilidade (ex: Seg-Sex, fins de semana...)"
            value={value}
            onChangeText={onChange}
            placeholderTextColor="#888"
          />
        )}
      />
      {errors.disponibilidade && <Text style={styles.error}>{errors.disponibilidade.message}</Text>} */}

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
        <AppText weight="bold" size={16} color="#fff">
          Finalizar
        </AppText>
      </TouchableOpacity>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
  );
}