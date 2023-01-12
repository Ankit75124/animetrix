import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Request = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [anime, setAnime] = useState('');

  return (
    <Container h="90vh">
      <VStack h="100%" justifyContent={'center'} spacing="16">
        <Heading children="Request your fav Anime" />
        <form style={{ width: '100%' }}>
          <Box marginY={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your Name"
              type={'text'}
              focusBorderColor={'green.400'}
            />
          </Box>
          <Box marginY={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="anime@watch.com"
              type={'email'}
              focusBorderColor={'green.400'}
            />
          </Box>

          <Box marginY={'4'}>
            <FormLabel htmlFor="anime" children="Anime" />
            <Input
              required
              id="anime"
              value={anime}
              onChange={e => setAnime(e.target.value)}
              placeholder="Give Full Name of Anime"
              type={'text'}
              focusBorderColor={'green.400'}
            />
          </Box>

          <Button my="4" colorScheme={'green'} type="submit">
            Send Mail
          </Button>

          <Box my="4">
            To check Available Animes!{' '}
            <Link to="/animes">
              <Button fontSize={'sm'} colorScheme={'green'} variant={'link'}>
                Click Here
              </Button>{' '}
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Request;
