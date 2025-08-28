import { ThemedView } from '@/components/ThemedView';
import { Button, Input } from '@/src/atoms';
import { PrioritySelector } from '@/src/molecules';
import { Task, TaskPriority } from '@/src/types';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';


export interface TaskFormProps {
  initialValues?: Task;
  onSubmit: (taskData: Task) => Promise<void>;
  onSuccess?: () => void;
  isLoading?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  initialValues,
  onSubmit,
  onSuccess,
  isLoading = false,
}) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [priority, setPriority] = useState<TaskPriority>(initialValues?.priority || 'média');
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setDescription(initialValues.description);
      setPriority(initialValues.priority);
    }
  }, [initialValues]);

  const validateForm = (): boolean => {
    setTitleError('');
    
    if (!title.trim()) {
      setTitleError('O título da tarefa é obrigatório!');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const taskData: Task = {
      ...initialValues,
      id: initialValues?.id || String(Date.now()),
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: initialValues?.completed || false,
    };

    try {
      await onSubmit(taskData);

      // Limpar formulário se não for edição
      if (!initialValues) {
        setTitle('');
        setDescription('');
        setPriority('média');
      }

      onSuccess?.();
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível salvar a tarefa. Tente novamente.');
    }
  };

  const handleClear = () => {
    setTitle(initialValues?.title || '');
    setDescription(initialValues?.description || '');
    setPriority(initialValues?.priority || 'média');
    setTitleError('');
  };

  return (
    <ThemedView style={styles.container}>
      <Input
        label="Título *"
        value={title}
        onChangeText={setTitle}
        placeholder="Ex: Estudar React Native"
        maxLength={100}
        showCharCount
        error={titleError}
      />

      <Input
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        placeholder="Descreva sua tarefa em detalhes (opcional)"
        maxLength={500}
        showCharCount
        multiline
      />
    

      <PrioritySelector
        selectedPriority={priority}
        onPriorityChange={setPriority}
      />

      <ThemedView style={styles.actions}>
        <Button
          title="Limpar"
          variant="secondary"
          onPress={handleClear}
          style={styles.clearButton}
        />

        <Button
          title={isLoading ? (initialValues ? 'Salvando...' : 'Criando...') : (initialValues ? 'Salvar' : 'Criar Tarefa')}
          variant="primary"
          onPress={handleSubmit}
          disabled={isLoading}
          style={styles.submitButton}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 20,
  },
  clearButton: {
    flex: 1,
  },
  submitButton: {
    flex: 2,
  },
});
