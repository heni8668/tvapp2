import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import { GrChannel } from "react-icons/gr";
import { RiMiniProgramLine } from "react-icons/ri";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { LuClipboardType } from "react-icons/lu";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import InputOutlinedIcon from '@mui/icons-material/InputOutlined';
import { GiBurningTree } from "react-icons/gi";
import {Link} from "react-router-dom";

const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">
            <GiBurningTree size={30} />
            &nbsp;&nbsp;&nbsp;&nbsp; T-Movie
          </span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/channels" style={{ textDecoration: "none" }}>
            <li>
              <GrChannel className="icon" />
              <span>Channels</span>
            </li>
          </Link>
          <Link to="/programs" style={{ textDecoration: "none" }}>
            <li>
              <RiMiniProgramLine className="icon" />
              <span>Programs</span>
            </li>
          </Link>
          <Link to="/category" style={{ textDecoration: "none" }}>
            <li>
              <CategoryOutlinedIcon className="icon" />
              <span>Categories</span>
            </li>
          </Link>
          <Link to="/types" style={{ textDecoration: "none" }}>
            <li>
              <LuClipboardType className="icon" />
              <span>Types</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <li>
            <SettingsOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <InputOutlinedIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar
