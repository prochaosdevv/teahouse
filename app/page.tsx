import ShopForm from "@/components/ShopForm"
import ShopList from "@/components/ShopList"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tea Delivery Shop Management</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <ShopForm />
        <ShopList />
      </div>
    </main>
  )
}

