import React, { useState } from "react";
import AddTask from "../Components/AddTask";
import Loader from "../Components/Loader";
import ReminderSvg from "../Components/ReminderSvg";
import Toast from "../Components/Toast";
import Update from "../Components/Update";
import { useApiCalls } from "../Hooks/useApiCalls";
import { ITodoListType } from "../type";

interface IProps {
  todoList: ITodoListType[];
}

export default function AddTodo({ todoList }: IProps) {
  const { addTodoTask } = useApiCalls();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [updatedTodoList, setUpdatedTodoList] = useState<any[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  /**
   * @description - This function is used to add new task to the todo list
   */
  const addTodoItem = () => {
    setIsSending(true);
    addTodoTask(title, description, todoList[0].userId).then((data) => {
      if (data?.success) {
        setUpdatedTodoList([...updatedTodoList, data.data]);
        setTitle("");
        setDescription("");
        setIsSending(false);
        setMessage(data?.message || "Task added successfully");
        setSuccess(true);
        setShowToast(true);
      } else {
        setIsSending(false);
        setMessage(data?.message || "Something Went wrong! Please Try Again");
        setSuccess(false);
        setShowToast(true);
      }
    });
  };

  /**
   * @description - This function is used to hide or show the toast
   */
  const hideOrShowToast = () => {
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    /**
     * @description - This is the component to add title in todo list.
     */
    <div className="m-5 w-96 h-[85vh] bg-white p-3 rounded-xl shadow-lg">
      {/* Showing toast in case of Api call. */}
      {showToast && <Toast message={message} success={success} />}
      <div className="text-xl text-black font-bold my-3 flex justify-between">
        Add Task
        <ReminderSvg />
      </div>
      <div className="my-4 flex justify-center">
        <AddTask />
      </div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          addTodoItem();
          hideOrShowToast();
        }}
        className="pt-5 flex flex-col justify-center items-center"
      >
        <input
          type={"text"}
          placeholder={"Add Title"}
          className={
            "w-full border-2 border-gray-300 rounded-lg p-2 outline-none  "
          }
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type={"text"}
          placeholder={"Add Description"}
          className={
            "w-full border-2 border-gray-300 rounded-lg p-2 outline-none mt-3"
          }
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* If todo adding process is ongoing than user cannot see any button and will be able to view loader only. */}
        {!isSending ? (
          <div>
            {title && description ? (
              <button className="bg-blue-600 mt-4 w-24 py-2 rounded-md text-md flex justify-center items-center text-white cursor-pointer hover:transition-all">
                Add
              </button>
            ) : (
              <button className="bg-blue-200 mt-4 w-24 py-2 rounded-md text-md flex justify-center items-center text-white">
                Add
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center mt-5">
            <Loader circle={true} />
          </div>
        )}
      </form>
    </div>
  );
}
