import MyCard from "./component/MyCard";
import logo from "../../public/logo/dark_logo_new.png";
import { Link, useLocation } from "react-router-dom";
import {
  ADD_MOVIE_PATH,
  ADD_BATCH_LINK_PATH,
  GENERE_PATH,
} from "./constant/routeContant";

export default function SideMenu() {
  return (
    <div className="w-[20%]  h-full ">
      <MyCard className="w-full  h-full rounded-tl-sm rounded-bl-sm ">
        <img src={logo} className=" px-3 py-1 w-full object-cover mb-5"></img>
        <Button key={"1"} to="/" />
        <Button key={"2"} to={ADD_MOVIE_PATH} title="Add Movie" />
        <Button key={"3"} to={GENERE_PATH} title="Genres" />
        <Button key={"4"} to={ADD_BATCH_LINK_PATH} title="Add Batch Links" />
      </MyCard>
    </div>
  );
}

interface ButtonParams {
  to?: string;
  title?: string;
}

function Button({ to = "/", title = "Home" }: ButtonParams) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to}>
      <div
        className={`${
          isActive ? "bg-accent" : "bg-transparent"
        } cursor-pointer hover:bg-accent  w-full text-sm font-semibold duration-150 text-start place-content-center my-1 px-3 h-9 rounded-[6px]`}
      >
        {title}
      </div>
    </Link>
  );
}
