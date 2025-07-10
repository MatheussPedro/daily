import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { AppText } from '@/components/text/appText';

export default function Welcome() {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/LogoDaily.png')}
        style={styles.logo}
      />
      <AppText weight="semi" size={18} style={styles.subtitle2}>Olá, tudo bem?</AppText>
      <AppText weight='semi' size={18} style={styles.subtitle}>Poderia me informar qual é você?</AppText>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/register/client/client')}
      >
        <AppText weight='bold' size={18} style={styles.buttonText}>Sou Cliente</AppText>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push('/')}
      >

        <AppText weight='bold' size={18} style={styles.buttonText}>Sou Diarista</AppText>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register/client/client')}>
        <Text style={styles.loginLink}>Já tem uma conta? Entrar</Text>
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
  logo: {
    width: 200,
    height: 200,
  },
  subtitle: {
    marginBottom: 32,
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle2: {
    marginTop: 32,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#2a9d8f',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  secondaryButton: {
    backgroundColor: '#264653',
  },
  buttonText: {
    color: '#fff',
  },
  loginLink: {
    marginTop: 24,
    color: '#666',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat_400Regular',
  },
});