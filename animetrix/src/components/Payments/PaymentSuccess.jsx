import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiCheckboxCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
  return (
    <Container h="90vh" p="16">
      <Heading
        my="8"
        textAlign={'center'}
      > You have pro pack</Heading>

      <VStack 
      boxShadow={"lg"}
      alignItems="center"
      borderRadius={'lg'}
      pb="16"
      > 

      <Box 
      w="full" bg={"green"} p="4" 
      css={{
        borderRadius: '8px 8px 0 0',
      }}
      >
        <Text color={"white"}>
          Payment Success
        </Text>
      </Box>

      <Box p="4">
        <VStack textAlign={'center'} px="8" mt="4" spacing="8">

        <Text>
          Congratulation you have pro pack now. You can watch all animes.
        </Text>

        <Heading size="4xl">
          <RiCheckboxCircleFill />
        </Heading>

        </VStack>

      </Box>

      <Link to="/profile">
      <Button variant="ghost">
        Go to profile
      </Button>
      </Link>

      <Heading size={"xs"}>
        Reference: bjhasjdjsahdasjhdjaskdha
      </Heading>

      </VStack>
    </Container>
  )
}

export default PaymentSuccess