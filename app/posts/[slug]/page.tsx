"use client"

import { useParams } from "next/navigation"


export default function PostID({params: {slug}}:{params: {slug:string}}) {
    // const params = useParams()
    // console.log(params)
    return <p className="text-2xl">
    Showing the blog post for the 
    slug <strong>{slug}</strong>
  </p>
}