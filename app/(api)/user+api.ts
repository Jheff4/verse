/* eslint-disable prettier/prettier */
import { neon } from "@neondatabase/serverless"

const sql = neon(`${process.env.DATABASE_URL}`)

export async function POST(request: Request) {
  // const posts = await sql("SELECT * FROM posts")
  const { name, email, clerkId } = await request.json()

  if (!name || !email || !clerkId) {
    return Response.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    const response = await sql`
    INSERT INTO users (
      name,
      email,
      clerk_id
    )
    VALUES (
      ${name},
      ${email},
      ${clerkId},
    )
  `

    return new Response(JSON.stringify({ data: response }), { status: 201 })
  } catch (error) {
    console.log(error)
    return Response.json({ error: error }, { status: 500 })
  }
}
