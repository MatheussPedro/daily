import { StyleSheet } from 'react-native';
import { FormRegisterAndLogin } from '../../../(auth)/styles/FormRegisterAndLogin';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F3EE',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#0E7C6E',
    height: 220,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#C8E6E0',
    fontSize: 16,
  },
  headerImage: {
    width: 80,
    height: 80,
    position: 'absolute',
    bottom: -40,
    right: '40%',
    resizeMode: 'contain',
  },
  formContainer: {
    marginTop: 60,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#0E7C6E',
  },
  input: FormRegisterAndLogin.input,
  button: {
    ...FormRegisterAndLogin.button,
    backgroundColor: '#0E7C6E',
  },
  error: FormRegisterAndLogin.error,
  bottomText: {
    textAlign: 'center',
    marginTop: 15,
    color: '#666',
  },
  link: {
    color: '#0E7C6E',
    fontWeight: 'bold',
  },
});