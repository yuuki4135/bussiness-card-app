import React from 'react'
import { useParams } from 'react-router-dom'
import { UserInfo } from '../organisms/user_info';

export const Card = () => {
  const { id } = useParams<{id: string}>()

  return (
    <div>
      <UserInfo id={id}/>
    </div>
  )
}
