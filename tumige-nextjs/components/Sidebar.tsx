import React, { SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TagIcon from "@mui/icons-material/Tag";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { green } from "@mui/material/colors";
import Filter5Icon from "@mui/icons-material/Filter5";
import Filter4Icon from "@mui/icons-material/Filter4";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter1Icon from "@mui/icons-material/Filter1";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import { useTasks } from "@/hooks/useTasks";
import { useQueryUser } from "@/hooks/useQueryUser";
import { useMutateUser } from "@/hooks/useMutateUser";

const Sidebar = () => {
  const styles = {
    button: {
      textTransform: "none",
      color: "#cacbce",
      lineHeight: "0px",
      paddingInline: "0px",
      margin: "10px 0px 10px 8px",
      "&:hover": {
        backgroundColor: "#36373a",
      },
    },
    icon: {
      padding: "3px 8px",
      borderRadius: "5px",
      "&:hover": {
        backgroundColor: "#36373a",
      },
    },
  };

  const router = useRouter();
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [priority, setPriority] = React.useState<boolean>(false);
  const [userName, setUserName] = React.useState<string>("名無しさん");
  const { updateUserName } = useMutateUser();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  let isBuycount = 0;
  let Priority5count = 0;
  let Priority4count = 0;
  let Priority3count = 0;
  let Priority2count = 0;
  let Priority1count = 0;
  let Tagcount = 0;
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dialogClose = () => {
    setDialogOpen(false);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserName(value);
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user != undefined) {
      updateUserName.mutate(userName);
    }
    setDialogOpen(false);
  };

  const handlePriority = () => {
    setPriority(!priority);
  };

  const changeName = () => {
    setDialogOpen(true);
    setAnchorEl(null);
  };

  const logout = async () => {
    setAnchorEl(null);
    queryClient.removeQueries(["tasks"]);
    queryClient.removeQueries(["user"]);
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
    router.push("/");
  };

  const { data: user } = useQueryUser();
  const { data: tasks } = useTasks();
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (user != undefined && user.nickName != null) {
      setUserName(user.nickName);
    } else {
      setUserName("名無しさん");
    }
    if (tasks != undefined) {
      const newTags = tags.slice();
      for (const task of tasks) {
        if (task.tag != null) {
          newTags.push(task.tag);
        }
      }
      setTags(newTags);
    }
  }, [user, tasks]);
  const uniqueTags = tags.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return (
    <div className="sidebar">
      <div className="sidebar_account">
        <div className="sidebar_account_Left">
          <Button onClick={handleClick} sx={styles.button} variant="text">
            <AccountCircleIcon />
            <p>{userName}</p>
            <ArrowDropDownOutlinedIcon />
          </Button>
        </div>
      </div>
      <Link className="sidebar_Link" href="/AllGame">
        <div className="sidebar_box">
          <SportsEsportsIcon />
          <p>全てのゲーム</p>
          <div className="sidebarCount">
            {tasks != undefined ? tasks.length : 0}
          </div>
        </div>
      </Link>
      <Link className="sidebar_Link" href="/isBuy">
        <div className="sidebar_box">
          <CreditScoreIcon sx={{ color: green[700] }} />
          <p>購入済み</p>
          <>
            {(() => {
              if (tasks != undefined) {
                isBuycount = tasks.filter((n) => n.isBuy === true).length;
              }
            })()}
          </>
          <div className="sidebarCount">{isBuycount}</div>
        </div>
      </Link>
      {priority ? (
        <div className="sidebar_account" onClick={handlePriority}>
          <div className="sidebar_account_Left">
            <div className="classification">優先度</div>
          </div>
          <div className="sidebar_account_Right" style={{ fontSize: "12px" }}>
            表示
          </div>
        </div>
      ) : (
        <>
          <div className="sidebar_account" onClick={handlePriority}>
            <div className="sidebar_account_Left">
              <div className="classification">優先度</div>
            </div>
            <div
              className="sidebar_account_Right"
              style={{ fontSize: "12px" }}></div>
          </div>
          <div className="sidebarPriority">
            <Link className="sidebar_Link" href="/Priority?value=5">
              <div className="sidebar_box">
                <Filter5Icon sx={{ color: "#95979c" }} />
                <div className="sidebarStarIcon">
                  <StarIcon sx={{ color: "#dbc28f" }} />
                  <StarIcon sx={{ color: "#dbc28f" }} />
                  <StarIcon sx={{ color: "#dbc28f" }} />
                  <StarIcon sx={{ color: "#dbc28f" }} />
                  <StarIcon sx={{ color: "#dbc28f" }} />
                </div>
                <>
                  {(() => {
                    if (tasks != undefined) {
                      Priority5count = tasks.filter((n) => n.rank === 5).length;
                    }
                  })()}
                </>
                <div className="sidebarCount">{Priority5count}</div>
              </div>
            </Link>
            <Link className="sidebar_Link" href="/Priority?value=4">
              <div className="sidebar_box">
                <Filter4Icon sx={{ color: "#95979c" }} />
                <div className="sidebarStarIcon">
                  <StarBorderIcon />
                  <StarIcon sx={{ color: "#dbc28f" }} />
                  <StarIcon sx={{ color: "#dbc28f" }} />
                  <StarIcon sx={{ color: "#dbc28f" }} />
                  <StarIcon sx={{ color: "#dbc28f" }} />
                </div>
                <>
                  {(() => {
                    if (tasks != undefined) {
                      Priority4count = tasks.filter((n) => n.rank === 4).length;
                    }
                  })()}
                </>
                <div className="sidebarCount">{Priority4count}</div>
              </div>
            </Link>
            <Link className="sidebar_Link" href="/Priority?value=3">
              <div className="sidebar_box">
                <Filter3Icon sx={{ color: "#95979c" }} />
                <div className="sidebarStarIcon">
                  <StarBorderIcon />
                  <StarBorderIcon />
                  <StarIcon sx={{ color: "#dbc28f" }} />
                  <StarIcon sx={{ color: "#dbc28f" }} />
                  <StarIcon sx={{ color: "#dbc28f" }} />
                </div>
                <>
                  {(() => {
                    if (tasks != undefined) {
                      Priority3count = tasks.filter((n) => n.rank === 3).length;
                    }
                  })()}
                </>
                <div className="sidebarCount">{Priority3count}</div>
              </div>
            </Link>
            <Link className="sidebar_Link" href="/Priority?value=2">
              <div className="sidebar_box">
                <Filter2Icon sx={{ color: "#95979c" }} />
                <div className="sidebarStarIcon">
                  <StarBorderIcon />
                  <StarBorderIcon />
                  <StarBorderIcon />
                  <StarIcon sx={{ color: "#dbc28f" }} />
                  <StarIcon sx={{ color: "#dbc28f" }} />
                </div>
                <>
                  {(() => {
                    if (tasks != undefined) {
                      Priority2count = tasks.filter((n) => n.rank === 2).length;
                    }
                  })()}
                </>
                <div className="sidebarCount">{Priority2count}</div>
              </div>
            </Link>
            <Link className="sidebar_Link" href="/Priority?value=1">
              <div className="sidebar_box">
                <Filter1Icon sx={{ color: "#95979c" }} />
                <div className="sidebarStarIcon">
                  <StarBorderIcon />
                  <StarBorderIcon />
                  <StarBorderIcon />
                  <StarBorderIcon />
                  <StarIcon sx={{ color: "#dbc28f" }} />
                </div>
                <>
                  {(() => {
                    if (tasks != undefined) {
                      Priority1count = tasks.filter((n) => n.rank === 1).length;
                    }
                  })()}
                </>
                <div className="sidebarCount">{Priority1count}</div>
              </div>
            </Link>
          </div>
        </>
      )}
      <div className="classification">タグ</div>
      {uniqueTags?.map((Tag) => {
        if (tasks != undefined) {
          Tagcount = tasks.filter((n) => n.tag === Tag).length;
        }
        return (
          <>
            <Link className="sidebar_Link" href={`/Tag?value=${Tag}`}>
              <div className="sidebar_box">
                <TagIcon sx={{ color: "#95979c" }} />
                {Tag != "" ? <p>{Tag}</p> : <p>タグなし</p>}
                <div className="sidebarCount">{Tagcount}</div>
              </div>
            </Link>
          </>
        );
      })}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <div className="MenuItem">
          <MenuItem onClick={changeName}>
            <SettingsIcon />
            <div className="MenuItemText">名前の変更</div>
          </MenuItem>
          <MenuItem onClick={logout}>
            <LogoutIcon />
            <div className="MenuItemText">ログアウト</div>
          </MenuItem>
        </div>
      </Menu>
      <Dialog
        open={dialogOpen}
        onClose={dialogClose}
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
            fontSize: "1.5rem",
            color: "#dbc28f",
            backgroundColor: "#2A2B2C",
            mb: "-25px",
          }}>
          名前の変更
        </DialogTitle>
        <DialogContent sx={{ color: "#96979d", backgroundColor: "#2A2B2C" }}>
          <div className="MainTopPageInputs">
            <div>
              <p>　</p>
              <input
                type="text"
                placeholder="名前を入力してください．"
                name="InputName"
                value={userName}
                onChange={handleChangeName}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#2A2B2C" }}>
          <Button onClick={dialogClose} sx={styles.button}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit} sx={styles.button}>
            更新
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sidebar;
