import type {APIRoute} from "astro";

export const GET: APIRoute = async () => {
  const person = {
    name: "Jesus Jimenez Cordero",
    age: 27
  }

  return new Response(JSON.stringify(person), {status: 200, headers: {"Content-Type": "application/json"}});
}