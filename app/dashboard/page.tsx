import Link from "next/link"
import { Store, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/shops">
          <Card>
            <CardHeader>
              <CardTitle>View Shops</CardTitle>
            </CardHeader>
            <CardContent>
              <Store className="h-12 w-12 text-blue-500" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/shops/add">
          <Card>
            <CardHeader>
              <CardTitle>Add Shop</CardTitle>
            </CardHeader>
            <CardContent>
              <Store className="h-12 w-12 text-green-500" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/users">
          <Card>
            <CardHeader>
              <CardTitle>Manage Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Users className="h-12 w-12 text-purple-500" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

