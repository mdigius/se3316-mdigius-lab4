import { NextResponse } from "next/server";

export default function middleware(req){
    let verify = req.cookies.get("loggedin");
    let admin = req.cookies.get("admin");
    let url = req.url
    if(!verify && url.includes('/lists')){
        return NextResponse.redirect("http://localhost:3000/register");
    }
    if(!verify && url.includes('/dashboard')){
        return NextResponse.redirect("http://localhost:3000/register");
    }
    if(admin != "true" && url.includes('/admin')){
        return NextResponse.redirect("http://localhost:3000/register");
    }

}