import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { server } from '../../redux/store';
import { buySubscription } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
import animetrix from '../../assets/images/animetrix.jpg';

const Subscribe = ({user}) => {

  const dispatch = useDispatch();

  const [key,setKey] = useState('');

  const {loading, error,subscriptionId} = useSelector(state => state.subscription);
  const { error:animeError} = useSelector(state => state.anime);

  const subscribeHandler = async () => {
  const {data} = await axios.get(`${server}/razorpaykey`);
  
  setKey(data.key);
  dispatch(buySubscription());
};

useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch({ type: 'clearError' });
  }

  if (animeError) {
    toast.error(animeError);
    dispatch({ type: 'clearError' });
  }

  if (subscriptionId) {
    const openPopUp = () => {
      const options = {
        key,
        name: 'Animetrix',
        description: 'Pro Pack',
        image: animetrix,
        subscription_id: subscriptionId,
        callback_url: `${server}/paymentverification`,
        prefill: {
          name: user.name,
          email: user.email,
          contact: '',
        },
        notes: {
          address: 'Ankit Raj',
        },
        theme: {
          color: 'green',
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    };
    openPopUp();
  }
}, [dispatch, error, user.name, user.email, key, subscriptionId, animeError]);
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

          <Button my="8" w="full" colorScheme={'green'} onClick={subscribeHandler} isLoading={loading}>
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