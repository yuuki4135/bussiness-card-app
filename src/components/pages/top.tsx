import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Text, Card, CardBody, CardFooter, Input, FormControl, FormLabel, FormErrorMessage, Button } from '@chakra-ui/react'
import { useUsers } from '../../hooks/useUsers'

export const Top = () => {
  const { loading, userIds, findAllUserIds } = useUsers()
  const [id, setId] = React.useState<string>('')
  const [error, setError] = React.useState<string | null>(null)
  const navigate = useNavigate()
  const pageChange = () => {
    if (!userIds?.includes(id)) {
      setError('IDが見つかりません')
      return
    }

    navigate(`/card/${id}`)
  }

  React.useEffect(() => {
    findAllUserIds()
  }, [])

  return (
    <>
      {loading ? ( <div>loading</div> ) : (
        <>
          <Text fontSize='2xl'>デジタル名刺アプリ</Text>
          <Card>
            <CardBody>
              <FormControl isRequired isInvalid={!!error}>
                <FormLabel>ID</FormLabel>
                <Input type='text' value={id} onChange={(e) => setId(e.target.value)} />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
            </CardBody>
            <CardFooter>
              <Button
                size='md'
                height='40px'
                width='220px'
                border='2px'
                color={'white'}
                borderColor='blue.500'
                backgroundColor='blue.500'
                onClick={() => pageChange()}
              >名刺を見る</Button>
            </CardFooter>
          </Card>
          <Link to='/card/register'>
            <Text fontSize='sm' sx={{marginTop: '10px'}}>
              新規登録はこちら
            </Text>
          </Link>
        </>
      )}
    </>
  )
}
