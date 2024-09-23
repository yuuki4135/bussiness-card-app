import React from 'react'
import { useParams } from 'react-router-dom'
import { UserInfo } from '../organisms/user_info';

export const Profile = () => {
  const { user_id } = useParams<{user_id: string}>()
  const validUserId = user_id || '';

  return (
    <UserInfo user_id={validUserId}/>
  )
}
