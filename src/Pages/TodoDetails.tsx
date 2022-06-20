import React, { useEffect, useState } from "react";
import InputWithEdit from "../Components/InputWithEdit";
import ReminderSvg from "../Components/ReminderSvg";
import { BsTrash } from "react-icons/bs";
import { ITodoListType } from "../type";
import { useNavigate, useParams } from "react-router-dom";
import { useApiCalls } from "../Hooks/useApiCalls";
import Toast from "../Components/Toast";
import Loader from "../Components/Loader";
import Update from "../Components/Update";

interface IProps {
  todoList: ITodoListType[];
}

export default function TodoDetails({ todoList }: IProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateTodoTask, deleteTodoTask } = useApiCalls();
  const [showDetailData, setShowDetailData] = useState<ITodoListType>();
  const [title, setTitle] = useState<string | undefined>();
  const [initialTitle, setInitialTitle] = useState<string | undefined>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [updating, setUpdating] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Filtering data to show on the basis of id which we are fetching from params.
    todoList.filter((item) =>
      setShowDetailData(todoList.find((item) => item.id === Number(id)))
    );
  }, [todoList]);

  useEffect(() => {
    showDetailData && setTitle(showDetailData?.title);
    showDetailData && setInitialTitle(showDetailData?.title);
  }, [showDetailData]);

  //This function is used to update the title of the todo list item and update the database with the new title.
  const handleUpdate = () => {
    setUpdating(true);
    setDisabled(true);
    showDetailData?.id &&
      title &&
      updateTodoTask(showDetailData?.id, title, showDetailData?.userId).then(
        (response) => {
          setUpdating(false);
          setShowToast(true);
          setMessage(response?.message || "Task updated successfully");
          setSuccess(true);
          hideOrShowToast();
        },
        (error) => {
          setUpdating(false);
          setShowToast(true);
          setMessage(
            error?.message || "Something went wrong! Please try again"
          );
          setSuccess(true);
          hideOrShowToast();
        }
      );
  };

  //This function is used to hide or show the toast message after 3 seconds and navigate to todo list page after 3 seconds.
  const hideOrShowToast = () => {
    setTimeout(() => {
      setShowToast(false);
      navigate("/todo-list");
    }, 3000);
  };

  // This function is called when user presses the delete button to delete the task from the todo list and also from the database as well.

  const handleDelete = () => {
    setUpdating(true);
    showDetailData?.id &&
      deleteTodoTask(showDetailData?.id).then(
        (response) => {
          setUpdating(false);
          setShowToast(true);
          setMessage(
            response?.message ||
              "Task deleted successfully :) Please Wait you will be redirected to home page"
          );
          setSuccess(true);
          hideOrShowToast();
        },
        (error) => {
          setUpdating(false);
          setShowToast(true);
          setMessage(
            error?.message || "Something went wrong! Please try again"
          );
          setSuccess(false);
          hideOrShowToast();
        }
      );
  };

  return (
    <div className="m-5 w-96 h-[85vh] bg-white p-3 rounded-xl shadow-lg">
      <div className="text-xl text-black font-bold my-3 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          Task Details
          <BsTrash
            className="hover:text-red-700 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
        <ReminderSvg />
      </div>
      {/* If showDetail data will present than only show the input field. If data is not present than showing loader for indicating that data is loading. */}
      {showDetailData ? (
        <InputWithEdit
          placeHolder="Add Title"
          label={"Title"}
          value={title}
          setValue={setTitle}
          initialValue={initialTitle || ""}
          setInitialValue={setInitialTitle}
          handleUpdate={handleUpdate}
          disabled={disabled}
          setDisabled={setDisabled}
          updating={updating}
        />
      ) : (
        <div className="flex justify-center items-center pt-20">
          {" "}
          <Loader />{" "}
        </div>
      )}
      {updating ? (
        <div className="flex justify-center items-center mt-5">
          <Loader circle={true} />
        </div>
      ) : (
        <></>
      )}
      {/* Showing toast when API will be called to update or delete todo item from the list. */}
      {showToast && <Toast message={message} success={success} />}

      {/* Showing update svg */}
      <Update />
    </div>
  );
}
