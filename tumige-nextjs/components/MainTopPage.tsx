import React from "react";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import AddGameForm from "./AddGameForm";

const MainTopPage = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="MainTopPage">
      <div className="SiteName">
        積みゲー保管庫
        <SportsEsportsIcon />
      </div>
      <button onClick={handleClickOpen} className="MainTopPageButton">
        <div className="MainTopPageButtonText">積みゲー追加</div>
        <ArrowDropDownOutlinedIcon />
      </button>
      <AddGameForm checkOpen={open} onValueChange={handleClickOpen} />
    </div>
  );
};

export default MainTopPage;
