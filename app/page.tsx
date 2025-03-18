"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { GoCheck } from "react-icons/go";
import { TbLoader } from "react-icons/tb";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const generateNickname = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setNickname("");

    try {
      const response = await fetch("/api/gen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt:
            prompt ||
            "랜덤한 유찬이의 별명 짓기(랜덤찬등의 형식을 금지하고, 랜덤한 상황을 상상하여 이에 맞는 별명을 제조하십시오(상상찬 금지)) ",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "별명 생성 중 오류가 발생했습니다.");
      }

      setNickname(data.nickname);
    } catch (err) {
      setError("별명 생성 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setIsLoading(false);
      setPrompt("");
    }
  };

  return (
    <>
      <main className={styles.container}>
        <div className={styles.box}>
          <h1>{nickname ? nickname : "별명찬"}</h1>
          <form onSubmit={generateNickname} className={styles.form}>
            <input
              type="text"
              className={styles.input}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="유찬이의 상황 넣기"
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? <TbLoader /> : <GoCheck />}
            </button>
          </form>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </main>
    </>
  );
}
