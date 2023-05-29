import { getTodo } from "@/api";
import AddTask from "./components/AddTask";
import ToDoList from "./components/ToDoList";

export default async function Home() {
  const tasks = await getTodo();
  return (
    <main className="max-w-4xl mt-4  mx-auto ">
      <div className="text-center my-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold"> To Do List </h1>
        <AddTask />
      </div>
      <ToDoList tasks={tasks} />
    </main>
  );
}
