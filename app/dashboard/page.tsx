"use client";
import Image from 'next/image'
import {CreateHeroList, UserDashboard} from '@/components'
export default function Dashboard() {
    return (
      <main className="overflow-hidden">
        <UserDashboard/>
      </main>
    )
  }