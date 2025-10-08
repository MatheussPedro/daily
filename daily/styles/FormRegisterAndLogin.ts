import { StyleSheet } from "react-native";

export const FormRegisterAndLogin = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
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
        maxWidth: '100%',
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: 'rgba(246, 246, 246, 0.3)',
        borderColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
        color: '#222',
        flexShrink: 1,
    },
    button: {
        width: '100%',
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 8,
        backgroundColor: '#2a9d8f',
        elevation: 3, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
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
    error:{

    },
checkboxContainer: {
    width: '100%',
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgba(255,255,255,0.2)', // mesmo do input
    backgroundColor: 'rgba(246,246,246,0.3)',
    padding: 12, // adiciona padding interno igual ao input
},
checkboxLabel: {
    marginBottom: 8,
    fontSize: 16,
    color: '#555',
},
checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
},
checkboxIcon: {
    fontSize: 22,
},
checkboxText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#222',
    flexShrink: 1, // garante que o texto não quebre fora do container
},
});