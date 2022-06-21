import "./Component.scss";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

interface IProps {
  completed: boolean;
  title: string;
  id: number;
}

export default function Card({ completed, title, id }: IProps) {
  const navigate = useNavigate();
  return (
    // This is the card component which takes completed, title and id values to show the card. And it will navigate to todo details page when the card is clicked.
    <div
      className="todo-list-card"
      onClick={() => navigate(`/todo-details/${id}`)}
    >
      <TiTick
        className={`text-xl ${
          !completed ? "text-slate-500" : "text-green-500"
        } `}
      />
      <div
        className={`text-base ${
          completed ? "text-slate-300" : "text-slate-700"
        }`}
      >
        {title}
      </div>
    </div>
  );
}
