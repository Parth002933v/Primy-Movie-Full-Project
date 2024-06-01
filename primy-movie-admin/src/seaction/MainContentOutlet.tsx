import { Outlet } from "react-router-dom";
import MyCard from "./component/MyCard";

export default function MainContent() {
  return (
    <div className="w-[80%] h-full  ">
      <MyCard className="overflow-auto no-scrollbar border-l-0 px-4 h-full duration-300 rounded-tr-sm rounded-br-sm">
        <Outlet />
      </MyCard>
    </div>
  );
}
