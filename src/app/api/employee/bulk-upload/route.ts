import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  const body = req.body();

  return new Response(JSON.stringify({
    status: true,
    message: "hello from bulk upload!"
  }))
}
