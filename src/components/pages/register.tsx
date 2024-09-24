import React, { useEffect } from 'react'
import { Heading, Card, CardBody, CardFooter, Input, Text, Select, Button } from '@chakra-ui/react'
import { useUsers } from '../../hooks/useUsers'
import { skill } from "../../types/userProfile";

export const Register = () => {

  const { skillKinds, loading, selectSkillKinds } = useUsers();

  useEffect(()=>{
    selectSkillKinds();
  }, [])

  return (
    <>
      { loading ? (
          <div>loading</div>
        ) : (
          <>
            <Heading>名刺新規作成</Heading>
            <Card>
              <CardBody>
                <Text>ID(※好きな英単語)</Text>
                <Input size='sm' />
                <Text>お名前</Text>
                <Input size='sm' />
                <Text>自己紹介</Text>
                <Input size='sm' />
                <Text>好きな技術</Text>
                <Select placeholder='Select option'>
                  { skillKinds?.map((skill: skill)=>{
                    return (
                      <option value={skill?.name} key={skill?.id}>{skill?.name}</option>
                    )
                  })}
                </Select>
              </CardBody>
              <CardFooter>
                <Button
                  size='md'
                  height='40px'
                  width='200px'
                  border='2px'
                  borderColor='blue.500'
                >登録</Button>
              </CardFooter>
            </Card>
          </>
        )
      }
    </>
  )
}
