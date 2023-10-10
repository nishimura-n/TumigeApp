import React, { SyntheticEvent, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { green } from "@mui/material/colors";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { useTasks } from "../hooks/useTasks";
import { FC } from "react";
import { Tumige } from "@prisma/client";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutateGame } from "@/hooks/useMutateGame";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import { useRouter } from "next/router";

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
  const styles = {
    button: {
      textTransform: "none",
      color: "#cacbce",
      fontSize: "1rem",
      "&:hover": {
        backgroundColor: "#36373a",
      },
    },
  };
  const dateString = updatedAt.toString().slice(0, 10);
  const { updateTaskMutation, deleteTaskMutation } = useMutateGame();
  const [inputTitle, setInputTitle] = useState<string>(title);
  const [inputNote, setInputNote] = useState(note);
  const [inputTag, setInputTag] = useState(tag);
  const [inputRank, setInputRank] = useState(rank);
  const [inputIsBuy, setInputIsBuy] = useState(isBuy);
  const [photo, setPhoto] = useState<File | string>("");
  const [open, setOpen] = React.useState(false);

  const handleFile: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (event.target.files === null || event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id.toString());
    formData.append("title", inputTitle);
    if (inputNote != null) {
      formData.append("note", inputNote);
    }
    if (inputTag != null) {
      formData.append("tag", inputTag);
    }
    if (inputRank != null) {
      formData.append("rank", inputRank.toString());
    }
    if (inputIsBuy != null) {
      formData.append("isBuy", inputIsBuy.toString());
    }
    formData.append("file", photo);
    if (fileName != null) {
      formData.append("oldfile", fileName);
    }
    updateTaskMutation.mutate(formData);
    setOpen(false);
  };

  const handleClickFev = () => {
    if (inputIsBuy === false) {
      setInputIsBuy(true);
    } else {
      setInputIsBuy(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let convertedValue;
    if (name === "inputRank") {
      convertedValue = parseFloat(value);
      setInputRank(convertedValue);
    } else if (name === "inputTitle") {
      convertedValue = value;
      setInputTitle(convertedValue);
    } else if (name === "inputNote") {
      convertedValue = value;
      setInputNote(convertedValue);
    } else if (name === "inputTag") {
      convertedValue = value;
      setInputTag(convertedValue);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (e: SyntheticEvent) => {
    e.preventDefault();
    deleteTaskMutation.mutate(id);
  };

  return (
    <>
      <div className="GameListContent">
        {/* <img className="GameListImg" src={`./example${id}.jpeg`} /> */}
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
          <Dialog
            open={open}
            onClose={handleClose}
            BackdropProps={{
              invisible: true,
            }}
            sx={{
              "& .MuiDialog-paper": {
                border: "1px solid #454545", // 枠線の設定
              },
            }}>
            <DialogTitle
              sx={{
                fontSize: "2rem",
                color: "#dbc28f",
                backgroundColor: "#2A2B2C",
                mb: "-24px",
              }}>
              積みゲーの編集
            </DialogTitle>
            <DialogContent
              sx={{ color: "#96979d", backgroundColor: "#2A2B2C" }}>
              <div className="MainTopPageInputs">
                <div>
                  <p>タイトル</p>
                  <input
                    type="text"
                    placeholder="ゲームのタイトルを入力してください。"
                    name="inputTitle"
                    value={inputTitle}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <p>概要</p>
                  <input
                    type="text"
                    placeholder="概要を入力してください。"
                    name="inputNote"
                    value={inputNote ? inputNote : ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <p>タグ</p>
                  <input
                    type="text"
                    placeholder="タグを1つだけ入力してください。(例：PS5)"
                    name="inputTag"
                    value={inputTag ? inputTag : ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <p className="MainTopPagePriority">
                    優先度
                    <StarIcon sx={{ color: "#dbc28f" }} />
                  </p>
                  <input
                    type="number"
                    placeholder="優先度(1〜5)"
                    name="inputRank"
                    min="1"
                    max="5"
                    value={inputRank ? inputRank : 1}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="MainTopPageisBuyImage">
                  <div className="MainTopPageisBuy">
                    <p>購入済み</p>
                    {!inputIsBuy ? (
                      <button onClick={handleClickFev}>
                        <CreditScoreIcon sx={{ color: "gray" }} />
                      </button>
                    ) : (
                      <button onClick={handleClickFev}>
                        <CreditScoreIcon sx={{ color: green[700] }} />
                      </button>
                    )}
                  </div>
                  <div className="MainTopPageImage">
                    <p>画像</p>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      accept="image/*,.png,.jpg,.jpeg"
                      onChange={handleFile}
                    />
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: "#2A2B2C" }}>
              <Button onClick={handleClose} sx={styles.button}>
                キャンセル
              </Button>
              <Button onClick={handleSubmit} sx={styles.button}>
                更新
              </Button>
            </DialogActions>
          </Dialog>
          <button onClick={handleDelete}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </>
  );
};

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
                </>
              );
            } else if (router.pathname != "/isBuy" && value == undefined) {
              return (
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
              );
            } else if (task.tag != null && value == task.tag) {
              return (
                <>
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
                </>
              );
            } else if (task.rank != null && parseInt(value, 10) == task.rank) {
              return (
                <>
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
