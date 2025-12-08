import React from 'react'

const ReservationDetails = async ({params} : {params: Promise<{id: string}>}) => {
    const {id} = await params;
  return (
    <div>Reservation #{id} Details </div>
  )
}

export default ReservationDetails