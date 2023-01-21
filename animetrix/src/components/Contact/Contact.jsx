import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../redux/actions/other';
import { toast } from 'react-hot-toast';

const Contact = () => {

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');


  const dispatch = useDispatch();
  const { loading,error, message:stateMessage } = useSelector(state => state.other);


  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, email, message);
    dispatch(contactUs(name,email,message));
  }

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }

      if (stateMessage) {
        toast.success(stateMessage);
        dispatch({ type: 'clearMessage' });
      }
    }, [dispatch, error, stateMessage]);
  

  return (
    <Container h="90vh">
      <VStack h="100%" justifyContent={'center'} spacing="16">
        <Heading children="Contact Us" />
        <form style={{ width: '100%' }} onSubmit={submitHandler}>
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
            <FormLabel htmlFor="message" children="Message" />
            <Textarea
              required
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Please send your Regards"
              type={'text'}
              focusBorderColor={'green.400'}
            />
          </Box>

          <Button
            my="4"
            colorScheme={'green'}
            type="submit"
            isLoading={loading}
          >
            Send Mail
          </Button>

          <Box my="4">
            Want to request a new anime?{' '}
            <Link to="/request">
              <Button fontSize={'sm'} colorScheme={'green'} variant={'link'}>
                Click Here
              </Button>{' '}
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
}

export default Contact