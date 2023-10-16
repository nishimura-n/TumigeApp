import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { green } from "@mui/material/colors";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { FC } from "react";
import { Tumige } from "@prisma/client";
import UpdateGameForm from "./UpdateGameForm";

export const GameListItem: FC<Omit<Tumige, "createdAt" | "userId">> = ({
  id,
  title,
  note,
  tag,
  rank,
  isBuy,
  updatedAt,
  fileName,
}) => {
  const dateString = updatedAt.toString().slice(0, 10);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="GameListContent">
        <img className="GameListImg" src={`./${fileName}`} />
        <div className="GameListContentDetail">
          <div className="GameListTitle">{title}</div>
          <div className="GameListNote">{note}</div>
          <div className="GameListTag">#{tag}</div>
          <div className="GameListTumige">
            優先度
            <StarIcon sx={{ color: "#dbc28f" }} />
            {rank}・{dateString}
            {isBuy && (
              <>
                <CreditScoreIcon sx={{ color: green[700], ml: "2px" }} />
              </>
            )}
          </div>
        </div>
        <div className="hoverText">
          <button onClick={handleClickOpen}>編集</button>
          <UpdateGameForm
            id={id}
            title={title}
            note={note}
            tag={tag}
            rank={rank}
            isBuy={isBuy}
            fileName={fileName}
            checkOpen={open}
            onValueChange={handleClickOpen}
          />
        </div>
      </div>
    </>
  );
};
