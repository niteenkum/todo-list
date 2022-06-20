import "./Component.scss";
interface IProps {
  circle?: boolean;
}
export default function Loader({ circle }: IProps) {
  /**
   * This is the loader component which takes boolean value to show the loader.
   * If the boolean value is true then it will show the loader in the circle format.
   * If the boolean value is false then it will not show the loader in the square and with different animation.
   * @param circle
   * @returns {JSX.Element}
   * */
  if (circle) {
    return <div className="circle-loader"></div>;
  }
  return (
    <div className="loader">
      <div className="loader-inner"></div>
    </div>
  );
}
