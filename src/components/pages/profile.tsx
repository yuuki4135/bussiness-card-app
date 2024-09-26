import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UserInfo } from '../organisms/user_info';
import { useUsers } from '../../hooks/useUsers';
import { Card, CardHeader, CardBody, Heading, Button } from '@chakra-ui/react'

export const Profile = () => {
  const { user_id } = useParams<{user_id: string}>()
  const navigate = useNavigate();
  const validUserId = user_id || '';
  const { loading, user, skills, findUser } = useUsers();
  const handleReturnClick = () => {
    navigate('/');
  };

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
              <Heading size='md' data-testid='name'>
                {user?.name}
              </Heading>
            </CardHeader>
            <CardBody>
              <UserInfo user={user} skills={skills || []}/>
            </CardBody>
          </Card>
          <Button
            size='md'
            height='40px'
            width='200px'
            border='2px'
            color={'white'}
            backgroundColor={'blue.500'}
            borderColor='blue.500'
            sx={{marginTop: '10px'}}
            data-testid='root-return-button'
            onClick={handleReturnClick}
          >戻る</Button>
        </>
      )}
    </>
  )
}
