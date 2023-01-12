import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const ForgetPassword = () => {

    const [email, setEmail] = useState('');

  return (
    <Container paddingy={"16"}
    height={"85vh"}>
      <form>
        <Heading
          children="Forget Password ?"
          my="16"
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
      </form>

      <VStack spacing={'8'}>
        <Input
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="anime@watch.com"
          type={'email'}
          focusBorderColor={'green.400'}
        />

        <Button type="submit"
        width={"full"} 
        colorScheme={'green'}
        >
            Send Reset Link
        </Button>
      </VStack>
    </Container>
  );
}

export default ForgetPassword