"use client";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../components/Modal";
import { useState, FormEventHandler } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState<string>("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await addTodo({
      id: uuidv4(),
      text: newTask,
    });
    setNewTask("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn w-full btn-primary bg-indigo-600 border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700"
      >
        ADD NEW TASK <AiOutlinePlus size={15} className="ml-2" />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg mb-4">Add New Task</h3>
          <div className="modal-actions">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs "
            />
            <button type="submit" className="btn ml-4 px-4">
              Add
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
