import * as React from 'react'
import { UserProfile, userSkills } from '../../types/userProfile'
import parse from 'html-react-parser';
import DOMPurify from "dompurify";
import { Heading, CardFooter, ButtonGroup, IconButton, Text } from '@chakra-ui/react'
import { Skill } from '../organisms/skill'
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiQiita } from "react-icons/si";
import { Link } from "react-router-dom";

type UserInfoProps = {
  user: UserProfile,
  skills: userSkills[]
};

export const UserInfo = (props: UserInfoProps) => {
  const { user, skills } = props;

  return (
    <>
      <Heading size='md' noOfLines={1}>自己紹介</Heading>
        <Text fontSize='sm' data-testid='description'>{parse(DOMPurify.sanitize(
            user?.description || '', {
              ALLOWED_TAGS: ['img'],
              ALLOWED_ATTR: ['href', 'target', 'src']
            }
          ))}</Text>
      <Heading as='h2' size='sm' noOfLines={1}>好きな技術</Heading>
      <Skill skills={skills}/>
      <CardFooter justifyContent={'center'}>
        <ButtonGroup spacing='2'>
          <Link to={user?.github_url || ''}>
            <IconButton data-testid='github-icon' aria-label='Github' isRound={true} variant='solid' colorScheme='gray' size='lg' icon={<FaGithub />}/>
          </Link>
          <Link to={user?.x_url || ''}>
            <IconButton data-testid='x-icon' aria-label='X' isRound={true} variant='solid' colorScheme='gray' size='lg' icon={<FaXTwitter />}/>
          </Link>
          <Link to={user?.qiita_url || ''}>
            <IconButton data-testid='qiita-icon' aria-label='Qiita' isRound={true} variant='solid' colorScheme='gray' size='lg' icon={<SiQiita />}/>
          </Link>
        </ButtonGroup>
      </CardFooter>
    </>
  )
}