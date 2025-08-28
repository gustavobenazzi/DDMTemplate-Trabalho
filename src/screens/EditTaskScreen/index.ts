mport React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTasks } from "@/src/hooks/useTasks";
import { TaskForm } from "@/src/organisms/TaskForm";

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, updateTask } = useTasks();
  const router = useRouter();

  const task = tasks.find(t => t.id === id);

  if (!task) return null;

  return (
    <TaskForm
      initialValues={task}
      onSubmit={(updatedTask) => {
        updateTask(updatedTask);
        router.back();
      }}
    />
  );
}
