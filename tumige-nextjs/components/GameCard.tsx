import React from "react";
import { useTasks } from "../hooks/useTasks";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { GameCardItem } from "./GameCardItem";

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
                    <GameCardItem
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
                  <GameCardItem
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
                    <GameCardItem
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
                    <GameCardItem
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
