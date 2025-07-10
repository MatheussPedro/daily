import { TextInput, TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useCadastro } from '@/context/CadastroContext';
import { AppText } from '@/components/text/appText';


export default function clientRegister() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const { setData } = useCadastro();
    const router = useRouter();


    const handleNextStep = () => {
    if (pass !== passConfirm) {
        alert('As senhas não coincidem!');
        return;
    }

    if(!nome || !email || !pass || !passConfirm){
     alert('Preencha todos os campos obrigatórios');
       return;
    }

    setData({ nome, email, pass, tipo: 'cliente' });
    router.push('/register/client/clientAddres');
    };

    return (
        <View style={styles.container}>
            <AppText weight='semi' size={18} style={styles.subtitle}>
                Preencha seus dados para criar sua conta de Cliente
            </AppText>

        <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Senha" value={pass} onChangeText={setPass} secureTextEntry placeholderTextColor="#888" />
        <TextInput style={styles.input} placeholder="Confirme Sua Senha" value={passConfirm} onChangeText={setPassConfirm} secureTextEntry placeholderTextColor="#888" />

            <TouchableOpacity
            style={styles.button}
            onPress={handleNextStep}
            >
            <AppText weight="bold" size={16} color="#fff">
                Próximo
            </AppText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(auth)/welcome')}>
                <Text style={styles.loginLink}>Voltar para o início</Text>
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
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    subtitle: {
        marginBottom: 32,
        marginTop: 8,
        textAlign: 'center',
    },
    subtitle2: {
        marginTop: 16,
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
    buttonText: {
        color: '#fff',
    },
    loginLink: {
        marginTop: 8,
        color: '#666',
        textDecorationLine: 'underline',
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
    },
});