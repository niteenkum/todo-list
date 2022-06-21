import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useApiCalls } from "./Hooks/useApiCalls";
import AddTodo from "./Pages/AddTodo";
import TodoDetails from "./Pages/TodoDetails";
import TodoList from './Pages/TodoList';
import { ITodoListType } from "./type";

function App() {
  const { getTodoList } = useApiCalls();
  const [todoList, setTodoList] = useState<ITodoListType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodoList().then((data) => {
     setTodoList(data?.data);
      setIsLoading(false);
    }
    );

  }, []);
  return (
    <div className='flex justify-center items-center h-[100vh]'>
<BrowserRouter>
    <Routes>

      <Route path="/" element={<TodoList todoList={todoList} isLoading={isLoading}/>} />
      <Route path="/todo-list" element={<TodoList todoList={todoList} isLoading={isLoading}/>} />
      <Route path="/todo-list/add-todo" element = {<AddTodo todoList={todoList}/>} />
      <Route path="/todo-details/:id" element = {<TodoDetails todoList={todoList}/>} />
    </Routes>
  </BrowserRouter>
    
    </div>
  );
}

export default App;
