export async function GET() {
  return new Response(JSON.stringify({
    status: true,
    message: "hello world"
  }))
}
