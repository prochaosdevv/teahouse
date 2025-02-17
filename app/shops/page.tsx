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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const shopTypes = [
  "Grocery",
  "Convenience Store",
  "Supermarket",
  "Department Store",
  "Specialty Store",
  "Other",
] as const

interface Shop {
  id: number
  name: string
  type: string
  address: string
  gstin: string
  contactPerson: string
  contactNumber: string
  employees: number
  teaCupsPerDay: number
  latitude: string
  longitude: string
}

const shopSchema = z.object({
  name: z.string().min(1, "Shop name is required"),
  type: z.enum([...shopTypes, "Other"]),
  otherType: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  gstin: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format"),
  contactPerson: z.string().min(1, "Contact person is required"),
  contactNumber: z.string().regex(/^[0-9]{10}$/, "Invalid phone number"),
  employees: z.number().int().positive("Number of employees must be positive"),
  teaCupsPerDay: z.number().int().nonnegative("Number of tea cups must be non-negative"),
  latitude: z.string(),
  longitude: z.string(),
})

export default function ViewShopsPage() {
  const [shops, setShops] = useState<Shop[]>([
    {
      id: 1,
      name: "Shop 1",
      type: "Grocery",
      address: "123 Main St",
      gstin: "27AAPFU0939F1ZV",
      contactPerson: "John Doe",
      contactNumber: "1234567890",
      employees: 5,
      teaCupsPerDay: 50,
      latitude: "40.7128",
      longitude: "-74.0060",
    },
    {
      id: 2,
      name: "Shop 2",
      type: "Supermarket",
      address: "456 Elm St",
      gstin: "27AAPFU0939F1ZV",
      contactPerson: "Jane Smith",
      contactNumber: "9876543210",
      employees: 20,
      teaCupsPerDay: 200,
      latitude: "34.0522",
      longitude: "-118.2437",
    },
  ])
  const [editingShop, setEditingShop] = useState<Shop | null>(null)
  const { toast } = useToast()
  const [otherSelected, setOtherSelected] = useState(false)

  const form = useForm<z.infer<typeof shopSchema>>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      name: "",
      type: "Grocery",
      otherType: "",
      address: "",
      gstin: "",
      contactPerson: "",
      contactNumber: "",
      employees: 0,
      teaCupsPerDay: 0,
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
    form.reset({
      ...shop,
      type: shop.type as z.infer<typeof shopSchema>["type"],
    })
    setOtherSelected(shop.type === "Other")
  }

  const onSubmit = (values: z.infer<typeof shopSchema>) => {
    if (editingShop) {
      setShops(
        shops.map((shop) =>
          shop.id === editingShop.id
            ? { ...shop, ...values, type: values.type === "Other" ? values.otherType! : values.type }
            : shop,
        ),
      )
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
            <TableHead>Type</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>GSTIN</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Employees</TableHead>
            <TableHead>Tea Cups/Day</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shops.map((shop) => (
            <TableRow key={shop.id}>
              <TableCell>{shop.name}</TableCell>
              <TableCell>{shop.type}</TableCell>
              <TableCell>{shop.address}</TableCell>
              <TableCell>{shop.gstin}</TableCell>
              <TableCell>{shop.contactPerson}</TableCell>
              <TableCell>{shop.contactNumber}</TableCell>
              <TableCell>{shop.employees}</TableCell>
              <TableCell>{shop.teaCupsPerDay}</TableCell>
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
                            name="type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Shop Type</FormLabel>
                                <Select
                                  onValueChange={(value) => {
                                    field.onChange(value)
                                    setOtherSelected(value === "Other")
                                  }}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select shop type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {shopTypes.map((type) => (
                                      <SelectItem key={type} value={type}>
                                        {type}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {otherSelected && (
                            <FormField
                              control={form.control}
                              name="otherType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Other Shop Type</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
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
                            name="gstin"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>GSTIN</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="contactPerson"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Person</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="contactNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Number</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="employees"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Employees</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="teaCupsPerDay"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Tea Cups consumed a day</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                  />
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
                                  <Input {...field} readOnly />
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
                                  <Input {...field} readOnly />
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

