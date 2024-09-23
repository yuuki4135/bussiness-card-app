import React from 'react'
import { useParams } from 'react-router-dom'
import { UserInfo } from '../organisms/user_info';
import { useUsers } from '../../hooks/useUsers';
import { Card, CardHeader, CardBody, Heading } from '@chakra-ui/react'

export const Profile = () => {
  const { user_id } = useParams<{user_id: string}>()
  const validUserId = user_id || '';
  const { loading, users, skills, findUser } = useUsers();

  React.useEffect(() => {
    findUser(validUserId);
  }, [user_id]);

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <Card>
          <CardHeader>
            <Heading size='md'>
              {users?.name}
            </Heading>
          </CardHeader>
          <CardBody>
            <UserInfo users={users} skills={skills || []}/>
          </CardBody>
        </Card>
      )}
    </>
  )
}
