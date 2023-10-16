import React, { useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import { green } from "@mui/material/colors";
import { useTasks } from "../hooks/useTasks";
import { FC } from "react";
import { Tumige } from "@prisma/client";
import { Grid } from "@mui/material";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { useRouter } from "next/router";
import AddGameForm from "./AddGameForm";

export const TaskItem: FC<Omit<Tumige, "createdAt" | "userId">> = ({
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
          <AddGameForm
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
        {/* <img className="GameListImg" src={`./example${id}.jpeg`} /> */}
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

interface GameCardProps {
  sort: string;
}

const GameCard = (props: GameCardProps) => {
  const router = useRouter();
  const value = router.query.value as string;
  const { data: tasks, status } = useTasks();
  // 日付に基づいてデータをソート
  const sortedData = tasks?.sort((a, b) => {
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();
    if (props.sort === "Asc") {
      return dateA - dateB; // 昇順
    } else {
      return dateB - dateA; // 降順
    }
  });

  return (
    <Grid container sx={{ ml: "4px" }}>
      {tasks?.map((task) => (
        <>
          {(() => {
            if (router.pathname == "/isBuy" && task.isBuy) {
              return (
                <>
                  <Grid item xs="auto">
                    <TaskItem
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      note={task.note}
                      tag={task.tag}
                      rank={task.rank}
                      isBuy={task.isBuy}
                      updatedAt={task.updatedAt}
                      fileName={task.fileName}
                    />
                  </Grid>
                </>
              );
            } else if (router.pathname != "/isBuy" && value == undefined) {
              return (
                <Grid item xs="auto">
                  <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    note={task.note}
                    tag={task.tag}
                    rank={task.rank}
                    isBuy={task.isBuy}
                    updatedAt={task.updatedAt}
                    fileName={task.fileName}
                  />
                </Grid>
              );
            } else if (task.tag != null && value == task.tag) {
              return (
                <>
                  <Grid item xs="auto">
                    <TaskItem
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      note={task.note}
                      tag={task.tag}
                      rank={task.rank}
                      isBuy={task.isBuy}
                      updatedAt={task.updatedAt}
                      fileName={task.fileName}
                    />
                  </Grid>
                </>
              );
            } else if (task.rank != null && parseInt(value, 10) == task.rank) {
              return (
                <>
                  <Grid item xs="auto">
                    <TaskItem
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      note={task.note}
                      tag={task.tag}
                      rank={task.rank}
                      isBuy={task.isBuy}
                      updatedAt={task.updatedAt}
                      fileName={task.fileName}
                    />
                  </Grid>
                </>
              );
            }
          })()}
        </>
      ))}
    </Grid>
  );
};

export default GameCard;
