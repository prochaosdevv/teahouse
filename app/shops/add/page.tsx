"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function AddShopPage() {
  const router = useRouter()
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

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        form.setValue("latitude", position.coords.latitude.toString())
        form.setValue("longitude", position.coords.longitude.toString())
      })
    }
  }, [form])

  const onSubmit = async (values: z.infer<typeof shopSchema>) => {
    try {
      // Here you would typically send the data to your backend
      console.log(values)
      toast({
        title: "Success",
        description: "Shop added successfully",
      })
      router.push("/shops")
    } catch (error) {
      console.error("Error adding shop:", error)
      toast({
        title: "Error",
        description: "Failed to add shop",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add Shop</CardTitle>
        </CardHeader>
        <CardContent>
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
              <div className="flex justify-between">
                <Button type="submit">Add Shop</Button>
                <Link href="/shops">
                  <Button variant="outline">View Shops</Button>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

