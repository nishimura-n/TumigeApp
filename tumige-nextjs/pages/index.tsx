import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import * as Yup from "yup";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Layout } from "../components/Layout";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("No email provided"),
  password: Yup.string()
    .required("No password provided")
    .min(5, "Password should be min 5 chars"),
});

const Home: NextPage = () => {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
          email: formValues.email,
          password: formValues.password,
        });
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: formValues.email,
        password: formValues.password,
      });
      setFormValues({
        email: "",
        password: "",
      });
      router.push("/AllGame");
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };
  return (
    <Layout title="Login">
      <div className="Login_form">
        <SportsEsportsIcon className="SportsEsportsIcon" />
        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit} method="POST" className="form_content">
          <div className="Login_form_set">
            <div className="Login_Input_Text">Email</div>
            <input
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="Login_Input"
              autoComplete="off"
            />
          </div>
          <div className="Login_form_set">
            <div className="Login_Input_Text">パスワード</div>
            <input
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              className="Login_Input"
              autoComplete="off"
            />
          </div>
          <button type="submit" className="Login_Button">
            {isRegister ? (
              <div className="Login_Button_Text">アカウントを作成</div>
            ) : (
              <div className="Login_Button_Text">ログイン</div>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            className="Login_Button_seni">
            {isRegister ? (
              <div className="Login_Button_Text_seni">ログインはこちら</div>
            ) : (
              <div className="Login_Button_Text_seni">
                アカウントを作成はこちら
              </div>
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Home;
