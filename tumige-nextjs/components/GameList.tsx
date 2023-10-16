import React from "react";
import { useTasks } from "../hooks/useTasks";
import { useRouter } from "next/router";
import { GameListItem } from "./GameListItem";

interface GameListProps {
  sort: string;
}

const GameList = (props: GameListProps) => {
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
    <div>
      {tasks?.map((task) => (
        <>
          {(() => {
            if (router.pathname == "/isBuy" && task.isBuy) {
              return (
                <>
                  <GameListItem
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
                </>
              );
            } else if (router.pathname != "/isBuy" && value == undefined) {
              return (
                <GameListItem
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
              );
            } else if (task.tag != null && value == task.tag) {
              return (
                <>
                  <GameListItem
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
                </>
              );
            } else if (task.rank != null && parseInt(value, 10) == task.rank) {
              return (
                <>
                  <GameListItem
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
                </>
              );
            }
          })()}
        </>
      ))}
    </div>
  );
};

export default GameList;
