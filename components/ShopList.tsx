import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getShops() {
  const res = await fetch("https://tea-delivery-app-design.vercel.app/api/shops", { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch shops")
  }
  return res.json()
}

export default async function ShopList() {
  const shops = await getShops()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Shops</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {shops.map((shop: any) => (
            <li key={shop.id} className="border rounded p-4">
              <h3 className="font-bold">{shop.name}</h3>
              <p className="text-sm text-gray-600">{shop.address}</p>
              <p className="text-sm">Contact: {shop.contact}</p>
              <p className="text-sm">Tea Types: {shop.teaTypes}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

