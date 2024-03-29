import Block from "@core/block/block";
import P2P from "./p2p";
// npm i express
// npm i -D @types/express
// npm i -D @types/cors cors
import express, { Express, Request, Response } from "express";
import os from "os";
import cors from "cors";

const app: Express = express();
const ws: P2P = new P2P();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/chains", (req: Request, res: Response) => {
  res.json(ws.get());
  console.log("############", res.json(ws.get()));
});

app.post("/block/mine", (req: Request, res: Response) => {
  // 블록에 기록할 내용을 받고
  const { data }: { data: Array<string> } = req.body;
  const newBlock: Block | null = Block.generateBlock(
    ws.latestBlock(),
    data,
    ws.getAdjustmentBlock()
  );
  if (newBlock == null) res.send("error");
  ws.addToChain(newBlock);
  res.json(newBlock);
});

// 기존에는 post로 작성했었는데 오타 이슈로 get으로 변경. 본인 v4확인도 귀찮
app.get("/peer/add", (req: Request, res: Response) => {
  const netWorkinterface = os.networkInterfaces();
  let v4: string;
  for (const key in netWorkinterface) {
    const Array = netWorkinterface[key];
    for (const value of Array) {
      if (!value.internal && value.family === "IPv4") v4 = value.address;
      // v4 ip 주소
    }
  }
  ws.addToPeer(`ws://${v4}:7545`);
  res.end();
});

app.get("/peer", (req: Request, res: Response) => {
  const sockets = ws.getSockets();
  res.json(sockets);
});

app.listen(8080, () => {
  console.log("server on~");
  ws.listen(7545);
});

// npx ts-node ./src/core/server/index.ts

// 기존에는 cmd ip config에서 v4주소 가져옴
