import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { green } from "@mui/material/colors";
import { FC } from "react";
import { Tumige } from "@prisma/client";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import UpdateGameForm from "./UpdateGameForm";

export const GameCardItem: FC<Omit<Tumige, "createdAt" | "userId">> = ({
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
      <div className="GameCardContent">
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
        <img className="GameCardImg" src={`${fileName}`} />
        <div className="GameCardContentDetail">
          <div className="GameCardTitle">{title}</div>
          <div className="GameCardNote">{note}</div>
          <div className="GameCardTag">#{tag}</div>
          <div className="GameCardTumige">
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
      </div>
    </>
  );
};
