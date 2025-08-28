import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

const messages = [
  '> Boo Easter Egg encontrado',
];

export const EasterEggTerminal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (visible && index < messages.length) {
      const timeout = setTimeout(() => {
        setDisplayedMessages(prev => [...prev, messages[index]]);
        setIndex(prev => prev + 1);
      }, 800);

      return () => clearTimeout(timeout);
    } else if (!visible) {
      setDisplayedMessages([]);
      setIndex(0);
    }
  }, [visible, index]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay} onTouchEnd={onClose}>
        <View style={styles.terminal}>
          {displayedMessages.map((msg, i) => (
            <Text key={i} style={styles.text}>{msg}</Text>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  terminal: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 8,
    width: '90%',
  },
  text: {
    color: 'lime',
    fontFamily: 'monospace',
    marginBottom: 6,
  },
});
