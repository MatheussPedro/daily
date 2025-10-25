import { Stack } from 'expo-router';
import { RegisterClientProvider } from '../../context/ClienteRegisterContext';
import { UserProvider } from '@/context/UserContext';

export default function AuthLayout() {
  return (
  <UserProvider>
    <RegisterClientProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login/createUser" />
        <Stack.Screen name="register/client/client" />
        <Stack.Screen name="register/client/clientAddres" />
      </Stack>
    </RegisterClientProvider>
  </UserProvider>
  );
}