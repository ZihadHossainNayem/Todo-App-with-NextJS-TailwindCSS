import { ITask } from "./types/task";

const baseUrl = "http://localhost:3001";

export const getTodo = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });
  const todo = await res.json();
  return todo;
};

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();
  return newTodo;
};

export const editToDo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const updateToDo = await res.json();
  return updateToDo;
};

export const deleteToDo = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
};
