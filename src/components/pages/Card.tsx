import React from 'react'
import { useParams } from 'react-router-dom'
import { UserInfo } from '../organisms/user_info';

export const Card = () => {
  const { user_id } = useParams<{user_id: string}>()

  return (
    <div>
      <UserInfo user_id={user_id}/>
    </div>
  )
}
