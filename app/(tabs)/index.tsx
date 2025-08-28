import { TaskListScreen } from '@/src/screens';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { EasterEggTerminal } from '../../src/organisms/EasterEggTerminal';

export default function HomeScreen() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'h') {
        setShowEasterEgg(true);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKey);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKey);
      }
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <TaskListScreen />
      <EasterEggTerminal visible={showEasterEgg} onClose={() => setShowEasterEgg(false)} />
    </View>
  );
}
