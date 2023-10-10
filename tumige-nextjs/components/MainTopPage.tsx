import React, { useState } from "react";
import { SyntheticEvent } from "react";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import StarIcon from "@mui/icons-material/Star";
import { green } from "@mui/material/colors";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutateGame } from "../hooks/useMutateGame";

const MainTopPage = () => {
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
  const [inputTitle, setInputTitle] = useState("");
  const [inputNote, setInputNote] = useState("");
  const [inputTag, setInputTag] = useState("");
  const [inputRank, setInputRank] = useState(1);
  const [inputisBuy, setInputisBuy] = useState(false);
  const [photo, setPhoto] = useState<File | string>("");
  const [open, setOpen] = React.useState(false);
  const { createTaskMutation } = useMutateGame();

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
    formData.append("title", inputTitle);
    formData.append("note", inputNote);
    formData.append("tag", inputTag);
    formData.append("rank", inputRank.toString());
    formData.append("isBuy", inputisBuy.toString());
    formData.append("file", photo);
    createTaskMutation.mutate(formData);
    setOpen(false);
  };

  const handleClickFev = () => {
    if (inputisBuy === false) {
      setInputisBuy(true);
    } else {
      setInputisBuy(false);
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
          積みゲーの追加
        </DialogTitle>
        <DialogContent sx={{ color: "#96979d", backgroundColor: "#2A2B2C" }}>
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
                value={inputNote}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p>タグ</p>
              <input
                type="text"
                placeholder="タグを1つだけ入力してください。(例：PS5)"
                name="inputTag"
                value={inputTag}
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
                value={inputRank}
                onChange={handleInputChange}
              />
            </div>
            <div className="MainTopPageisBuyImage">
              <div className="MainTopPageisBuy">
                <p>購入済み</p>
                {!inputisBuy ? (
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
            作成
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MainTopPage;
