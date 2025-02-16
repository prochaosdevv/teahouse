"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"

interface Shop {
  id: number
  name: string
  address: string
  latitude: string
  longitude: string
}

const shopSchema = z.object({
  name: z.string().min(1, "Shop name is required"),
  address: z.string().min(1, "Address is required"),
  latitude: z.string().regex(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$/, "Invalid latitude"),
  longitude: z
    .string()
    .regex(
      /^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)|(([-+]?)([\d]{1,2})((\.)(\d+))?)|(([-+]?)([\d]{1,3})((\.)(\d+))?)$/,
      "Invalid longitude",
    ),
})

export default function ViewShopsPage() {
  const [shops, setShops] = useState<Shop[]>([
    {
      id: 1,
      name: "Shop 1",
      address: "123 Main St",
      latitude: "40.7128",
      longitude: "-74.0060",
    },
    {
      id: 2,
      name: "Shop 2",
      address: "456 Elm St",
      latitude: "34.0522",
      longitude: "-118.2437",
    },
  ])
  const [editingShop, setEditingShop] = useState<Shop | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof shopSchema>>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      name: "",
      address: "",
      latitude: "",
      longitude: "",
    },
  })

  const handleDelete = (id: number) => {
    setShops(shops.filter((shop) => shop.id !== id))
    toast({
      title: "Success",
      description: "Shop deleted successfully",
    })
  }

  const handleEdit = (shop: Shop) => {
    setEditingShop(shop)
    form.reset(shop)
  }

  const onSubmit = (values: z.infer<typeof shopSchema>) => {
    if (editingShop) {
      setShops(shops.map((shop) => (shop.id === editingShop.id ? { ...shop, ...values } : shop)))
      setEditingShop(null)
      toast({
        title: "Success",
        description: "Shop updated successfully",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View Shops</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Latitude</TableHead>
            <TableHead>Longitude</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shops.map((shop) => (
            <TableRow key={shop.id}>
              <TableCell>{shop.name}</TableCell>
              <TableCell>{shop.address}</TableCell>
              <TableCell>{shop.latitude}</TableCell>
              <TableCell>{shop.longitude}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => handleEdit(shop)}>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Shop</DialogTitle>
                      </DialogHeader>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Shop Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="latitude"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Latitude</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="longitude"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Longitude</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit">Update Shop</Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" onClick={() => handleDelete(shop.id)}>
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4">
        <Link href="/dashboard">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}

