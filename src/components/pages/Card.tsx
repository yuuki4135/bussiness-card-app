import React from 'react'
import { useParams } from 'react-router-dom'

export const Card = () => {
  const { id } = useParams<{id: string}>()

  return (
    <div>
      {id}
    </div>
  )
}
