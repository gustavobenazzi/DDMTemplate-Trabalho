import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native';

type Member = { name: string; age?: number; role?: string };

const TEAM: Member[] = [
  { name: 'Gustavo Matos Benazzi', age: 21 },
  { name: 'Gabriel Adolf Worm', age: 20 },
  { name: 'Amanda Lais', age: 20 },
  { name: 'Fernando Vassoler', age: 20 },
  { name: 'Suziane Marques', age: 20 },
  { name: 'Marcos Antônio Moretto', role: 'Responsável pelo código' },
];

function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sobre o App</Text>
      <Text style={styles.description}>
        App Lista de Tarefas desenvolvido com React Native, Expo e Expo Router para fins educacionais.
      </Text>

      <Text style={styles.sectionTitle}>Equipe de Desenvolvimento</Text>
      <FlatList
        data={TEAM}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              {item.age ? <Text style={styles.meta}>Idade: {item.age} anos</Text> : null}
              {item.role ? <Text style={styles.meta}>{item.role}</Text> : null}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  description: { fontSize: 14, color: '#555', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#F6F8FA',
    marginBottom: 10,
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4C9EEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '700' },
  name: { fontSize: 16, fontWeight: '600' },
  meta: { fontSize: 13, color: '#666', marginTop: 2 },
});

export default AboutScreen;