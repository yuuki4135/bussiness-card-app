import React, { useEffect } from 'react'
import { Heading, Card, CardBody, CardFooter, Input, Textarea, Select, Button, Text, Flex } from '@chakra-ui/react'
import { useUsers } from '../../hooks/useUsers'
import type { skill } from "../../types/userProfile";
import { useForm, SubmitHandler } from "react-hook-form"
import {
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

type Inputs = {
  user_id: string;
  name: string;
  description: string;
  github_id: string;
  qiita_id: string;
  x_id: string;
  skill_id: number;
}

export const Register = () => {
  const navigate = useNavigate()
  const { skillKinds, loading, selectSkillKinds, createUser, createSkill } = useUsers();
  const [dataBaseError, setDataBaseError] = React.useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (inputData: Inputs) => {
    const user_result = await createUser({
      user_id: inputData.user_id,
      name: inputData.name,
      description: inputData.description,
      github_id: inputData.github_id,
      qiita_id: inputData.qiita_id,
      x_id: inputData.x_id
    })
    if(user_result.error){
      setDataBaseError(user_result.error.details)
    }else{
      const skill_result = await createSkill({
        user_id: inputData.user_id,
        skill_id: inputData.skill_id
      })
      if(skill_result.error){
        setDataBaseError(skill_result.error.details)
      }else{
        navigate("/")
      }
    }
  }

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardBody>
                  <FormControl isRequired isInvalid={!!errors.user_id}>
                    <FormLabel>ID(※好きな英単語)</FormLabel>
                    <Input size='sm' 
                        {...register("user_id", {
                        required: "IDの入力は必須です",
                        pattern: {
                          value: /^[a-zA-Z]+$/,
                          message: "英単語文字列のみを入力してください"
                        }
                        })}
                    />
                    <FormErrorMessage>{errors.user_id && errors.user_id.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl isRequired isInvalid={!!errors.name}>
                    <FormLabel>お名前</FormLabel>
                    <Input size='sm'
                      {...register("name", {
                        required: "お名前の入力は必須です"
                      })}
                    />
                    <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl isRequired isInvalid={!!errors.description}>
                    <FormLabel>自己紹介</FormLabel>
                    <Textarea size='sm'
                      {...register("description", {
                        required: "自己紹介の入力は必須です"
                      })}
                    />
                    <FormErrorMessage>{errors.description && errors.description.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl isRequired isInvalid={!!errors.skill_id}>
                    <FormLabel>好きな技術</FormLabel>
                    <Select placeholder='Select option' {
                      ...register("skill_id", {
                        required: "好きな技術の入力は必須です"
                      })
                    }>
                      { skillKinds?.map((skill: skill)=>{
                        return (
                          <option value={skill?.id} key={skill?.id}>{skill?.name}</option>
                        )
                      })}
                    </Select>
                    <FormErrorMessage>{errors.skill_id && errors.skill_id.message}</FormErrorMessage>
                  </FormControl>
                  <FormControl>
                    <FormLabel>GithubID</FormLabel>
                    <Input size='sm'
                      {...register("github_id")}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>QiitaID</FormLabel>
                    <Input size='sm'
                      {...register("qiita_id")}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>XID</FormLabel>
                    <Input size='sm'
                      {...register("x_id")}
                    />
                  </FormControl>
                </CardBody>
                <CardFooter sx={{maxWidth: '240px'}}>
                  <Flex direction='column'>
                    <Text fontSize='sm'>*は必須項目です</Text>
                    <Button
                      size='md'
                      height='40px'
                      width='200px'
                      border='2px'
                      borderColor='blue.500'
                      isLoading={isSubmitting} type='submit'
                      >登録
                    </Button>
                    {dataBaseError && <Text color='red.500' fontSize='sm' sx={{
                      wordBreak: 'break-all'
                    }}>{dataBaseError}</Text>}
                  </Flex>
                </CardFooter>
              </Card>
            </form>
          </>
        )
      }
    </>
  )
}
