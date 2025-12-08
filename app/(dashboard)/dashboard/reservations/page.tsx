import React from 'react'
import Link from 'next/link'

const Reservations = () => {
  return (
    <div>
        <ul>
            <li><Link href="/dashboard/reservations/1">Reservation 1</Link></li>
            <li><Link href="/dashboard/reservations/2">Reservation 2</Link></li>
        </ul>
    </div>
  )
}

export default Reservations