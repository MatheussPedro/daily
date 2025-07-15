import { TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import { useCadastro } from '@/context/CadastroContext';
import { AppText } from '@/components/text/appText';

const schema = yup.object().shape({
    nome: yup.string().required('Nome é obrigatório'),
    email: yup
        .string()
        .required('O e-mail é obrigatório')
        .email('Digite um e-mail válido com @'),
    pass: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
    passConfirm: yup
        .string()
        .oneOf([yup.ref('pass')], 'As senhas não coincidem')
        .required('Confirmação de senha é obrigatória')
}).required();

export default function DiaristRegister() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const { setData } = useCadastro();
    const router = useRouter();

    const onSubmit = (data: any) => {
    setData({ nome: data.nome, email: data.email, pass: data.pass, tipo: 'diarista' });
    router.push('/(auth)/register/diarist/diaristComplement');
  };

    return (
    <View style={styles.container}>
      <AppText weight='semi' size={18} style={styles.subtitle}>
        Preencha seus dados para criar sua conta de Diarista
      </AppText>
       {/* O <Controller> do react-hook-form serve como ponte entre os componentes de input controlados (como o TextInput do React Native) e o gerenciamento de estado e validação do formulário feito pelo react-hook-form. */}

      {/* control={control}: passa o objeto control que vem do useForm() — ele gerencia os campos do formulário.

        name="nome": nome do campo dentro do formulário.
        render: é a função que retorna o input real.
        onChange: função que atualiza o valor do campo.
        value: valor atual do campo (vem do form).
        Ambos são conectados automaticamente ao estado interno do react-hook-form. */}

    {errors.nome && <Text style={styles.error}>{errors.nome.message}</Text>}
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={value}
            onChangeText={onChange}
            placeholderTextColor="#888"
          />
        )}
      />

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
        keyboardType="email-address"
        autoCapitalize="none"
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
            value={value}
            onChangeText={onChange}
            secureTextEntry
            placeholderTextColor="#888"
          />
        )}
      />

      {errors.passConfirm && <Text style={styles.error}>{errors.passConfirm.message}</Text>}
      <Controller
        control={control}
        name="passConfirm"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Confirme Sua Senha"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            placeholderTextColor="#888"
          />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <AppText weight="bold" size={16} color="#fff">
          Próximo
        </AppText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/welcome')}>
        <Text style={styles.loginLink}>Voltar para o início</Text>
      </TouchableOpacity>
    </View>
    )
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
    
  }
});
