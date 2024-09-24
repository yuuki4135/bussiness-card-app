import React, { useEffect } from 'react'
import { Heading, Card, CardBody, CardFooter, Input, Text, Select, Button } from '@chakra-ui/react'
import { useUsers } from '../../hooks/useUsers'
import { skill } from "../../types/userProfile";
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  example: string
  exampleRequired: string
}

export const Register = () => {
  const { skillKinds, loading, selectSkillKinds } = useUsers();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

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
                <Text>GithubID</Text>
                <Input size='sm' />
                <Text>QiitaID</Text>
                <Input size='sm' />
                <Text>XID</Text>
                <Input size='sm' />
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
