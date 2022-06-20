import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Loader from "../Components/Loader";
import ProgressBar from "../Components/ProgressBar";
import ReminderSvg from "../Components/ReminderSvg";
import { ITodoListType } from "../type";

interface IProps {
  todoList: ITodoListType[];
  isLoading: boolean;
}

export default function TodoList({ todoList, isLoading }: IProps) {
  const navigate = useNavigate();
  return (
    <>
      {
        <div className="m-5 w-96 h-[85vh] bg-white p-3 rounded-xl shadow-lg">
          <div className="text-xl text-black font-bold my-3 flex justify-between items-center">
            To Do Task
            <ReminderSvg />
          </div>
          {/* Shwoing loader in the case when data loading is in process if data is loaded than only showing all the details in card.  */}
          {isLoading ? (
            <div className="flex justify-center items-center pt-24">
              <Loader />
            </div>
          ) : (
            <>
              <div className="mb-4">
                <div className="flex justify-between p-2 my-1">
                  <div className="text-slate-400 text-sm">
                    {/* Doing calculation to show the total completed and total todo lis percentage */}
                    {(todoList?.filter((item) => item.completed).length || 0) +
                      " / " +
                      (todoList?.length || 0)}
                  </div>
                  <div className="text-slate-500 text-xs">
                    {" "}
                    {((todoList?.filter((item) => item.completed).length /
                      todoList?.length) *
                      100 || 0) + "% Completed"}{" "}
                  </div>
                </div>
                {/* This is the progressbar component which takes percentage to show the progress. */}
                <ProgressBar
                  percentage={
                    ((todoList?.filter((item) => item.completed).length /
                      todoList?.length) *
                      100 || 0) + "%"
                  }
                />
              </div>
              <div className="overflow-y-scroll h-[65%] ">
                {/* All card is clickable to view and to delete or to update any todo items. */}
                {todoList?.map((item, index) => (
                  <Card
                    key={index}
                    title={item?.title}
                    completed={item?.completed}
                    id={item?.id}
                  />
                ))}
              </div>
              <div className="flex justify-center my-3">
                {/* This is the plus button shown on dashboard or homepage. When user click on this button user will be moved to add todo page. */}
                <div
                  className=" bg-blue-600 h-10 w-10 rounded-full text-3xl flex justify-center items-center text-white cursor-pointer hover:bg-white hover: border-2 hover:text-black hover:transition-all"
                  onClick={() => {
                    navigate("/todo-list/add-todo");
                  }}
                >
                  <span className="-mt-2">+</span>
                </div>
              </div>
            </>
          )}
        </div>
      }
    </>
  );
}
