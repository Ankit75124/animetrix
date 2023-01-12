import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import { TiSocialLinkedinCircular, TiSocialGithubCircular,TiSocialInstagramCircular } from 'react-icons/ti';

const Footer = () => {
  return (
    <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width="full">
          <Heading children="All Rights Reserved" color={'white'} />
          <Heading
            children="Ankit Raj"
            fontFamily={'body'}
            size="sm"
            color={'Green'}
          />
        </VStack>
        <HStack spacing={['2', '10']} 
        justifyContent="center"
        color={'white'}
        fontSize={'50'}
        >
          <a href="https://www.linkedin.com/in/rajankit24/" target={'_blank'}>
            <TiSocialLinkedinCircular />
          </a>
          <a href="https://github.com/Ankit75124" target={'_blank'}>
            <TiSocialGithubCircular />
          </a>
          <a href="https://www.linkedin.com/in/rajankit24/" target={'_blank'}>
            <TiSocialInstagramCircular />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
