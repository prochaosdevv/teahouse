"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function ShopForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    teaTypes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormData({ name: "", address: "", contact: "", teaTypes: "" })
        router.refresh()
      } else {
        console.error("Failed to save shop data")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Shop</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Shop Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact">Contact Information</Label>
            <Input id="contact" name="contact" value={formData.contact} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="teaTypes">Types of Tea Available</Label>
            <Textarea
              id="teaTypes"
              name="teaTypes"
              value={formData.teaTypes}
              onChange={handleChange}
              placeholder="Enter tea types, separated by commas"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add Shop
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

