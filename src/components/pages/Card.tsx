import React from 'react'
import { useParams } from 'react-router-dom'
import { User } from '../organisms/user';

export const Card = () => {
  const { id } = useParams<{id: string}>()

  return (
    <div>
      <User id={id}/>
    </div>
  )
}
