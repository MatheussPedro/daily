import { Stack } from 'expo-router';
import { RegisterClientProvider } from '../../context/ClienteRegisterContext';


export default function AuthLayout() {
  return (
    <RegisterClientProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login/createUser" />
        <Stack.Screen name="register/client/client" />
        <Stack.Screen name="register/client/clientAddres" />
      </Stack>
    </RegisterClientProvider>
  );
}