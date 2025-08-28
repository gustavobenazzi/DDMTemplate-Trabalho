import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const logged = await AsyncStorage.getItem('loggedIn');
    if (logged === 'true') {
      router.replace('/(tabs)');
    }
  };

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Erro', 'Usuário e senha são obrigatórios');
      return;
    }
  
    const storedUser = await AsyncStorage.getItem('user');
    const storedPass = await AsyncStorage.getItem('pass');
  
    if (!storedUser || !storedPass) {
      await AsyncStorage.setItem('user', username);
      await AsyncStorage.setItem('pass', password);
      await AsyncStorage.setItem('loggedIn', 'true');
      router.replace('/(tabs)');
      return;
    }
  
    if (username === storedUser && password === storedPass) {
      await AsyncStorage.setItem('loggedIn', 'true');
      router.replace('/(tabs)');
    } else {
      Alert.alert('Erro', 'Credenciais inválidas');
      setPassword(''); // limpa senha
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Login</Text>
      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
});
