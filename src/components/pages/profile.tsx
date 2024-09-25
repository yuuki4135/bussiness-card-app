import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { UserInfo } from '../organisms/user_info';
import { useUsers } from '../../hooks/useUsers';
import { Card, CardHeader, CardBody, Heading, Button } from '@chakra-ui/react'

export const Profile = () => {
  const { user_id } = useParams<{user_id: string}>()
  const validUserId = user_id || '';
  const { loading, user, skills, findUser } = useUsers();

  React.useEffect(() => {
    findUser(validUserId);
  }, [user_id]);

  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <>
          <Card>
            <CardHeader>
              <Heading size='md'>
                {user?.name}
              </Heading>
            </CardHeader>
            <CardBody>
              <UserInfo user={user} skills={skills || []}/>
            </CardBody>
          </Card>
          <Link to='/'>
            <Button
              size='md'
              height='40px'
              width='200px'
              border='2px'
              color={'white'}
              backgroundColor={'blue.500'}
              borderColor='blue.500'
              sx={{marginTop: '10px'}}
            >戻る</Button>
          </Link>
        </>
      )}
    </>
  )
}
