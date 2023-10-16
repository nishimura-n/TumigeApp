import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export const MainPageDisplayDescDate = () => {
  return (
    <>
      <AccessTimeIcon />
      <div className="MainPageMenuItemDivText">日付</div>
      <ArrowUpwardIcon />
    </>
  );
};

export const MainPageDisplayAscDate = () => {
  return (
    <>
      <AccessTimeIcon />
      <div className="MainPageMenuItemDivText">日付</div>
      <ArrowDownwardIcon />
    </>
  );
};
