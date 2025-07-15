import { TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { useCadastro } from '@/context/CadastroContext';
import { AppText } from '@/components/text/appText';

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
    <View style={styles.container}>
      <AppText weight='semi' size={18} style={styles.subtitle}>
        Preencha seus dados para criar sua conta de Diarista
      </AppText>

    {errors.cpf && <Text style={styles.error}>{errors.cpf.message}</Text>}
      <Controller
        control={control}
        name="cpf"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="CPF"
            value={value}
            onChangeText={onChange}
            placeholderTextColor="#888"
          />
        )}
      />

    {errors.telefone && <Text style={styles.error}>{errors.telefone.message}</Text>}
      <Controller
        control={control}
        name="telefone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
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

    {errors.servico && <Text style={styles.error}>{errors.servico.message}</Text>}
      <Controller
        control={control}
        name="servico"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Tipo de serviço (ex: Limpeza, Passar Roupa)"
            value={value}
            onChangeText={onChange}
            placeholderTextColor="#888"
          />
        )}
      />

{errors.precoHora && <Text style={styles.error}>{errors.precoHora.message}</Text>}
<Controller
  control={control}
  name="precoHora"
  render={({ field: { onChange, value } }) => (
    <TextInput
      style={styles.input}
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

{errors.experiencia && <Text style={styles.error}>{errors.experiencia.message}</Text>}
<Controller
  control={control}
  name="experiencia"
  render={({ field: { onChange, value } }) => (
    <TextInput
      style={styles.input}
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

    {errors.observacao && <Text style={styles.error}>{errors.observacao.message}</Text>}
      <Controller
        control={control}
        name="observacao"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Conte um pouco sobre você"
            value={value}
            onChangeText={onChange}
            multiline
            numberOfLines={4}
            placeholderTextColor="#888"
          />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <AppText weight="bold" size={16} color="#fff">
          Finalizar
        </AppText>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  subtitle: {
    marginBottom: 32,
    marginTop: 8,
    textAlign: 'center',
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
    marginBottom: 16,
    marginTop: 8,
  },
  loginLink: {
    marginTop: 8,
    color: '#666',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
  },
  error: {
    color: '#e63946',
    fontSize: 13,
    marginBottom: 8,
    alignSelf: 'flex-start',
    fontFamily: 'Montserrat_400Regular',
  }
})