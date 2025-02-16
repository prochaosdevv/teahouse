import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(req: Request) {
  const { username, password } = await req.json()

  // In a real application, you would validate the credentials against a database
  if (username === "admin" && password === "password") {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" })
    return NextResponse.json({ token })
  } else {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  }
}

