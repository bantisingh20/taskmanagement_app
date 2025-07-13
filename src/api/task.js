import { useApi } from "../hooks/apihook";

export const createTask = (task) => {
  return useApi("/tasks", "POST", task);
}

export const updateTask = (taskId, task) => {
  return useApi(`/tasks/${taskId}`, "PUT", task);
}

export const deleteTask = (taskId) => {
  return useApi(`/tasks/${taskId}`, "DELETE");  
}

export const getTask = (taskId) => {
  return useApi(`/tasks/${taskId}`, "GET"); 
}

export const getTasks = () => {
  return useApi("/tasks", "GET");
}

export const getTasksByPriority = (priority) => {
  return useApi(`/tasks?priority=${priority}`, "GET");
}

export const getTasksByStatus = (status) => {
  return useApi(`/tasks?status=${status}`, "GET");
} 

export const getTasksByAssignee = (assigneeId) => {
  return useApi(`/tasks?assignee=${assigneeId}`, "GET");
} 

export const getTasksByDueDate = (dueDate) => {
  return useApi(`/tasks?dueDate=${dueDate}`, "GET");
} 

export const getpriority = () => {
  return useApi("/priority", "GET");
}

export const getStatus = () => {
  return useApi("/status", "GET");
}

export const createPriority = (priority) => {
  return useApi("/priority", "POST", priority);
} 

export const createStatus = (status) => {
  return useApi("/status", "POST", status);
}

export const updatePriority = (priorityId, priority) => {
  return useApi(`/priority/${priorityId}`, "PUT", priority);
}
export const updateStatus = (statusId, status) => {
  return useApi(`/status/${statusId}`, "PUT", status);
}

export const deletePriority = (priorityId) => {
  return useApi(`/priority/${priorityId}`, "DELETE");
}

export const deleteStatus = (statusId) => { 
  return useApi(`/status/${statusId}`, "DELETE");
}

export const getTaskById = (taskId) => {
  return useApi(`/tasks/${taskId}`, "GET");
}
export const getPriorityById = (priorityId) => {
  return useApi(`/priority/${priorityId}`, "GET");
}

export const getStatusById = (statusId) => {
  return useApi(`/status/${statusId}`, "GET");
}
export const getTasksByFilter = (filter) => {
  const query = new URLSearchParams(filter).toString();
  return useApi(`/tasks?${query}`, "GET");
}
export const getPriorityByName = (name) => {
  return useApi(`/priority?name=${name}`, "GET");
} 

export const getStatusByName = (name) => {
  return useApi(`/status?name=${name}`, "GET");
} 

export const getTasksByDateRange = (startDate, endDate) => {
  return useApi(`/tasks?startDate=${startDate}&endDate=${endDate}`, "GET");
}

export const getTasksByAssigneeAndStatus = (assigneeId, status) => {
  return useApi(`/tasks?assignee=${assigneeId}&status=${status}`, "GET");
}

export const getTasksByPriorityAndStatus = (priority, status) => {
  return useApi(`/tasks?priority=${priority}&status=${status}`, "GET");
}


