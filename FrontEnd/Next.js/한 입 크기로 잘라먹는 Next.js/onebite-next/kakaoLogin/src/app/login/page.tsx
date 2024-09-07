// app/page.js 또는 원하는 컴포넌트 파일
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  console.log(session);

  const handleLogin = () => {
    signIn("kakao");
  };

  const handleLogout = () => {
    signOut("kakao");
  };

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      alert("로그인 실패: " + result.error);
    }
  };

  return (
    <div>
      {!session ? (
        <>
          <button onClick={handleLogin}>카카오 로그인</button>
          <form onSubmit={handleCredentialsLogin}>
            <div>
              <label>
                사용자 이름:
                <input
                  type="text"
                  name="username"
                  placeholder="jsmith"
                  required
                />
              </label>
            </div>
            <div>
              <label>
                비밀번호:
                <input
                  type="password"
                  name="password"
                  placeholder="password123"
                  required
                />
              </label>
            </div>
            <button type="submit">로그인</button>
          </form>
        </>
      ) : (
        <>
          <div>로그인 되었습니다.</div>
          <div>{session.user?.name}</div>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      )}
    </div>
  );
}
