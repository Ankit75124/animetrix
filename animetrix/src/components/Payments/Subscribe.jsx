import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Subscribe = () => {
  return (
    <Container h="90vh" p="16">
      <Heading children="Welcome" my="8" textAlign={'center'} />

      <VStack
        boxShadow={'lg'}
        alignItems="stretch"
        borderRadius={'lg'}
        spacing="0"
      >
        <Box
          bg="green"
          p="4"
          css={{
            borderRadius: '8px 8px 0 0',
          }}
        >
          <Text color="white" children={`Pro Pack -  ₹199`} />
        </Box>

        <Box p="4">
          <VStack textAlign={'center'} px="8" mt="8" spacing="8">
            <Text children={`Join Pro Pack to get access to all animes.`} />

            <Heading size="md" children={`₹199 only`} />
          </VStack>

          <Button my="8" w="full" colorScheme={'green'}>
            Buy Now
          </Button>
        </Box>

        <Box
          bg="blackAlpha.600"
          p="4"
          css={{
            borderRadius: '0 0 8px 8px',
          }}
        >
          <Heading
            color="white"
            textTransform={'uppercase'}
            size="sm"
            children={`100% refund at cancellation`}
          />
          <Text
            fontSize={'xs'}
            color="white"
            children="*Terms and conditions apply"
          />
        </Box>
      </VStack>
    </Container>
  );
}

export default Subscribe