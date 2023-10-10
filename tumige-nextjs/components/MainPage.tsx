import React, { useState } from "react";
import MainTopPage from "./MainTopPage";
import GameList from "./GameList";
import GameCard from "./GameCard";
import StarIcon from "@mui/icons-material/Star";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FormatLineSpacingIcon from "@mui/icons-material/FormatLineSpacing";
import GridViewIcon from "@mui/icons-material/GridView";
import TagIcon from "@mui/icons-material/Tag";
import { green } from "@mui/material/colors";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";

const MainPage = () => {
  const styles = {
    button: {
      textTransform: "none",
      color: "#cacbce",
      lineHeight: "0px",
      paddingInline: "0px",
      margin: "0px 0px 0px 8px",
      "&:hover": {
        backgroundColor: "#36373a",
      },
    },
  };
  const [anchorElSort, setAnchorElSort] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElType, setAnchorElType] = React.useState<null | HTMLElement>(
    null
  );
  const openSort = Boolean(anchorElSort);
  const openType = Boolean(anchorElType);
  const [sort, setSort] = useState("");
  const [type, setType] = useState("");
  const router = useRouter();

  const handleClickSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElSort(event.currentTarget);
  };

  const handleClickType = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElType(event.currentTarget);
  };

  const handleCloseSort = (value: string) => {
    setSort(value);
    setAnchorElSort(null);
  };

  const handleCloseType = (value: string) => {
    setType(value);
    setAnchorElType(null);
  };

  return (
    <div className="MainPage">
      <MainTopPage />
      <div className="MainPageContent">
        <div className="MainPageContentTop">
          {(() => {
            if (router.pathname == "/Favorite") {
              return (
                <div className="GameBox">
                  <CreditScoreIcon sx={{ color: green[700] }} />
                  購入済み
                </div>
              );
            } else if (
              router.query.value != undefined &&
              Number(router.query.value) >= 1 &&
              Number(router.query.value) <= 5
            ) {
              return (
                <div
                  className="GameBox"
                  style={{ paddingLeft: "4px", gap: "1px" }}>
                  優先度
                  <StarIcon sx={{ color: "#dbc28f", fontSize: "1.2rem" }} />
                  {router.query.value}
                </div>
              );
            } else if (router.query.value != undefined) {
              return (
                <div className="GameBox" style={{ gap: "4px" }}>
                  <TagIcon sx={{ color: "#95979c" }} />
                  {router.query.value != "" ? (
                    <>{router.query.value} </>
                  ) : (
                    <>タグなし</>
                  )}
                </div>
              );
            } else {
              return (
                <div className="GameBox">
                  <SportsEsportsIcon />
                  全てのゲーム
                </div>
              );
            }
          })()}
          <div className="GameSort">
            <div className="GameSortIcon">
              <Button
                onClick={handleClickSort}
                sx={styles.button}
                variant="text">
                {sort === "Desc" ? (
                  <div
                    className="MainPageMenuItemText"
                    style={{ color: "#dbc28f" }}>
                    <AccessTimeIcon />
                    <div className="MainPageMenuItemDivText">日付</div>
                    <ArrowUpwardIcon />
                  </div>
                ) : (
                  <>
                    {sort === "Asc" ? (
                      <div
                        className="MainPageMenuItemText"
                        style={{ color: "#dbc28f" }}>
                        <AccessTimeIcon />
                        <div className="MainPageMenuItemDivText">日付</div>
                        <ArrowDownwardIcon />
                      </div>
                    ) : (
                      <>
                        <FormatLineSpacingIcon />
                        <div className="MainPageSort">並び替え</div>
                      </>
                    )}
                  </>
                )}
              </Button>
              <Menu
                anchorEl={anchorElSort}
                open={openSort}
                onClose={handleCloseSort}>
                <div className="MainPageMenuItem">
                  <MenuItem onClick={() => handleCloseSort("Desc")}>
                    {sort === "Desc" ? (
                      <div
                        className="MainPageMenuItemText"
                        style={{ color: "#dbc28f" }}>
                        <AccessTimeIcon />
                        <div className="MainPageMenuItemDivText">日付</div>
                        <ArrowUpwardIcon />
                      </div>
                    ) : (
                      <div className="MainPageMenuItemText">
                        <AccessTimeIcon />
                        <div className="MainPageMenuItemDivText">日付</div>
                        <ArrowUpwardIcon />
                      </div>
                    )}
                  </MenuItem>
                  <MenuItem onClick={() => handleCloseSort("Asc")}>
                    {sort === "Asc" ? (
                      <div
                        className="MainPageMenuItemText"
                        style={{ color: "#dbc28f" }}>
                        <AccessTimeIcon />
                        <div className="MainPageMenuItemDivText">日付</div>
                        <ArrowDownwardIcon />
                      </div>
                    ) : (
                      <div className="MainPageMenuItemText">
                        <AccessTimeIcon />
                        <div className="MainPageMenuItemDivText">日付</div>
                        <ArrowDownwardIcon />
                      </div>
                    )}
                  </MenuItem>
                </div>
              </Menu>
            </div>
            <div className="GameSortIcon">
              <Button
                onClick={handleClickType}
                sx={styles.button}
                variant="text">
                {type === "List" ? (
                  <div
                    className="MainPageMenuItemText"
                    style={{ color: "#dbc28f" }}>
                    <ListAltIcon />
                    <div className="MainPageSort">リスト</div>
                  </div>
                ) : (
                  <>
                    {type === "Card" ? (
                      <div
                        className="MainPageMenuItemText"
                        style={{ color: "#dbc28f" }}>
                        <GridViewIcon />
                        <div className="MainPageSort">カード</div>
                      </div>
                    ) : (
                      <>
                        <ListAltIcon />
                        <div className="MainPageSort">リスト</div>
                      </>
                    )}
                  </>
                )}
              </Button>
              <Menu
                anchorEl={anchorElType}
                open={openType}
                onClose={handleCloseType}>
                <div className="MainPageMenuItem">
                  <MenuItem onClick={() => handleCloseType("List")}>
                    <div className="MainPageMenuItemText">
                      <ListAltIcon />
                      <div className="MainPageMenuItemDivText">リスト</div>
                    </div>
                  </MenuItem>
                  <MenuItem onClick={() => handleCloseType("Card")}>
                    <div className="MainPageMenuItemText">
                      <GridViewIcon />
                      <div className="MainPageMenuItemDivText">カード</div>
                    </div>
                  </MenuItem>
                </div>
              </Menu>
            </div>
            {/* <MoreHorizIcon /> */}
          </div>
        </div>
        <div className="MainPageborder"></div>
        <div className="MainPageGameList">
          {type === "List" ? (
            <GameList sort={sort} />
          ) : (
            <>
              {type === "Card" ? (
                <GameCard sort={sort} />
              ) : (
                <GameList sort={sort} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default MainPage;
