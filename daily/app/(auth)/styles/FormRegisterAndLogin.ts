import { StyleSheet } from "react-native";

export const FormRegisterAndLogin = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
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
        borderWidth: 1.5,
        borderRadius: 12,
        backgroundColor: '#f6f6f6',
        borderColor: '#e0e0e0',
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 16,
        color: '#222',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
        elevation: 1,
    },
    button: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 8,
        backgroundColor: '#2a9d8f',
        elevation: 4,
        shadowColor: '#2a9d8f',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        opacity: 0.97,
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
    docButton: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderRadius: 8,
        marginRight: 4,
    },
    error: {
        color: '#e63946',
        fontSize: 13,
        marginBottom: 8,
        alignSelf: 'flex-start',
        fontFamily: 'Montserrat_400Regular',
    },
    checkboxContainer: {
        width: '100%',
        marginBottom: 16,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'rgba(255,255,255,0.2)',
        backgroundColor: 'rgba(246,246,246,0.3)',
        padding: 12,
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
        flexShrink: 1,
    },
    genderView: {
        flexDirection: "row", 
        justifyContent: "space-around"
    },
    genderViewIntern: {
        flexDirection: "row", 
        alignItems: "center"
    }
});