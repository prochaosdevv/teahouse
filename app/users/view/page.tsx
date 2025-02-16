"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface User {
  id: number
  username: string
  email: string
}

export default function ViewUsersPage() {
  const [users] = useState<User[]>([
    { id: 1, username: "user1", email: "user1@example.com" },
    { id: 2, username: "user2", email: "user2@example.com" },
  ])

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>View Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Link href="/users">
              <Button>Back to Manage Users</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

