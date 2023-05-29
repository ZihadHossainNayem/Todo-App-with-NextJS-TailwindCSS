"use client";
import { ITask } from "../../types/task";
import { LuEdit } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import Modal from "../components/Modal";
import { FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { deleteToDo, editToDo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [editTask, setEditTask] = useState<boolean>(false);
  const [deleteTask, setDeleteTask] = useState<boolean>(false);

  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEdit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editToDo({
      id: task.id,
      text: taskToEdit,
    });
    setEditTask(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    await deleteToDo(id);
    setDeleteTask(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-4">
        <LuEdit
          onClick={() => setEditTask(true)}
          className="text-blue-500 cursor-pointer"
          size={25}
        />

        <Modal modalOpen={editTask} setModalOpen={setEditTask}>
          <form onSubmit={handleSubmitEdit}>
            <h3 className="font-bold text-lg mb-4">Edit the Task</h3>
            <div className="modal-actions">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs "
              />
              <button type="submit" className="btn ml-4 px-4">
                Edit
              </button>
            </div>
          </form>
        </Modal>

        <RiDeleteBin6Line
          onClick={() => setDeleteTask(true)}
          className="text-red-500 cursor-pointer"
          size={25}
        />
        <Modal modalOpen={deleteTask} setModalOpen={setDeleteTask}>
          <h3 className="text-lg">Confirm to Delete</h3>
          <div className="modal-action">
            <button onClick={() => handleDelete(task.id)} className="btn">
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
