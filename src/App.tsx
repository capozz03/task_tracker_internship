import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const { REACT_APP_TASK_AUTH_BACKEND_URL, REACT_APP_TASK_BACKEND_URL } =
    process.env;

  const authHandler = () => {
    fetch(`${REACT_APP_TASK_AUTH_BACKEND_URL}/ladum/token/generate`, {
      method: "POST",
      body: JSON.stringify({ user_id: "1" }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(({ token }) => setToken(token));
  };
  const getTaskHandler = () => {
    fetch(`${REACT_APP_TASK_BACKEND_URL}/api/v1.0/task/tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(({ data }) => setData(data));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>GROUP_2_DEV_ENV</p>
        <button type={"button"} onClick={authHandler}>
          {" "}
          СДЕЛАТЬ ЗАПРОС НА АТОРИЗАЦИЮ ПОЛЬЗОВАТЕЛЯ С ID=1
        </button>
        <br />
        <br />
        <button disabled={!token} type={"button"} onClick={getTaskHandler}>
          СДЕЛАТЬ ЗАПРОС НА ПОЛУЧЕНИЕ TASKS
        </button>
        {!!data.length && (
          <>
            <h2>Список полученных задач</h2>
            {data.map((el: any) => (
              <div key={el.task_id}>
                <p>{el.title}</p>
              </div>
            ))}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
