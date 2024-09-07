import NextAuth from "next-auth/next";
import Kakao from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "이메일",
          type: "text",
          placeholder: "이메일 주소 입력",
        },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const user = { id: "1", name: "test", email: "123@123.com" };
        if (
          credentials!.username == "123@123.com" &&
          credentials!.password == "123"
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  //   session: {
  //     strategy: "jwt",
  //     maxAge: 10,
  //   },
});

export { handler as GET, handler as POST };
