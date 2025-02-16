import { NextResponse } from "next/server"

const shops: any[] = []

export async function GET() {
  return NextResponse.json(shops)
}

export async function POST(request: Request) {
  const shop = await request.json()
  shop.id = Date.now().toString()
  shops.push(shop)
  return NextResponse.json(shop, { status: 201 })
}

