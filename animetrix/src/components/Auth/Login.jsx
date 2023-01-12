import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  return (
    <Container h={'90vh'}>
      <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Heading children={'Welcome to AnimeTrix!'} />
        <form style={{ width: '100%' }}>
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
            <FormLabel htmlFor="password" children="Enter your password" />
            <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="********"
              type={'password'}
              focusBorderColor={'green.400'}
            />
          </Box>
          <Box>
            <Link to="/forgetpassword">
              <Button fontSize={'sm'} variant={'link'}>
                Forget Password
              </Button>
            </Link>
          </Box>

          <Button my="4" colorScheme={'green'} type="submit">
            Login
          </Button>

          <Box my="4">
            New User?{' '}
            <Link to="/register">
              <Button fontSize={'sm'} colorScheme={'green'} variant={'link'}>
                Sign Up
              </Button>{' '}
              Here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
}

export default Login