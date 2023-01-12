import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const ChangePassword = () => {

    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

  return (
    <Container py="16" minH="90vh">
      <form>
        <Heading
          children="Change Password"
          my="16"
          textAlign={['center', 'left']}
        />

        <VStack spacing={'8'}>
          <Input
            required
            id="password"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="Old password"
            type={'password'}
            focusBorderColor={'green.400'}
          />

          <Input
            required
            id="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="New password"
            type={'password'}
            focusBorderColor={'green.400'}
          />


          <Button w="full" colorScheme={'green'} type="submit">Change Password</Button>

        </VStack>
      </form>
    </Container>
  );
}

export default ChangePassword