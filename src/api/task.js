import { useApi } from "../hooks/apihook";

export const SaveTask = (task) => {
  console.log(task)
  const { data, error, loading } = useApi("tasks", {
    method: "POST",
    body: task,
  });

  return {
    task: data || null,
    error,
    loading,
  };
};

export const useTasks = () => {
  const { data, error, loading } = useApi("tasks");

  return {
    tasks: data || [],
    error,
    loading,
  };
}

