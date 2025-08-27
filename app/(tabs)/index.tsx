import { TaskListScreen } from '@/src/screens';
import { EasterEggTerminal } from '../../src/organisms/EasterEggTerminal';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

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
