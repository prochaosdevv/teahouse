"use client"

import { useEffect } from "react"
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

export default function AddShopPage() {
  const router = useRouter()
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

