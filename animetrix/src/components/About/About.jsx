import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import introVideo from '../../assets/videos/intro.mp4';
import termsAndCondition from '../../assets/docs/termsAndCondition.js';

const Founder = () => (
  <Stack
    direction={['column', 'row']}
    spacing={['4', '16']}
    alignItems="center"
    justifyContent="center"
  >
    <VStack>
      <Avatar
        src="https://avatars.githubusercontent.com/u/60788484?s=400&u=81eeda3fe4be1bb4e670d49e37cb4ec37389c264&v=4"
        boxSize={['40', '48']}
      />
      <Text children="Owner" opacity={0.7} />
    </VStack>

    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="Ankit Raj" size={['md', 'xl']} />
      <Text
        alignItems={['center', 'left']}
        children={`I'm a Data Manager & Full Stack Developer and a Tech Enthusiast. I love to learn new things and share my knowledge with others. I'm a self taught developer and I'm always ready to learn new things.`}
      />
    </VStack>
  </Stack>
);

const VideoPlayer = () => (
  <Box>
    <video
      autoPlay
      muted
      controls
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      src={introVideo}
    ></video>
  </Box>
);

const TandC = ({ termsAndConditions }) => (
  <Box>
    <Heading
      size="md"
      children="Terms and Conditions"
      textAlign={['center', 'left']}
      my="4"
    />

    <Box h="sm" p="4" overflowY={"scroll"}>
      <Text
        letterSpacing="widest"
        fontFamily={'heading'}
        textAlign={['center', 'left']}
      >
        {termsAndConditions}
      </Text>

      <Heading
        my="4"
        size={'xs'}
        children="Refund only can be done within 24 hours of purchase."
      />
    </Box>
  </Box>
);

const About = () => {
  return (
    <Container maxWidth={'container.lg'} padding={'16'} boxShadow="lg">
      <Heading children="About Me" textAlign={['center', 'left']} />

      <Founder />
      <Stack m="8" direction={['column', 'row']} alignItems={'center'}>
        <Text fontFamily={'cursive'} m="8" textAlign={['center', 'left']}>
          We are Anime Streaming Platform with some premium animes avaliable
          only for premium weebs.
        </Text>
        <Link to="/subscribe">
          <Button variant={'ghost'} colorScheme={'green'}>
            Check-out our plans
          </Button>
        </Link>
      </Stack>

      <VideoPlayer />

      <TandC termsAndConditions={termsAndCondition} />

      <HStack my="4" padding="4">
        <RiSecurePaymentFill />
        <Heading
          size={'xs'}
          fontFamily={'sans-serif'}
          textTransform={'uppercase'}
          children={'Payment is secured by RazorPay'}
        />
      </HStack>
    </Container>
  );
};

export default About;
