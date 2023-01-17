import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';

const ChangePassword = () => {

    const [newPassword, setNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

     const dispatch = useDispatch();

     const submitHandler = e => {
       e.preventDefault();

       dispatch(changePassword(oldPassword, newPassword));
     };

     const {loading, message, error}=  useSelector(state => state.profile);

     useEffect(() =>{
      if(error){
        toast.error(error);
        dispatch({type:'clearError'})
      }
      if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' });
      }
     },[dispatch,error,message]);

  return (
    <Container py="16" minH="90vh">
      <form onSubmit={submitHandler}>
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


          <Button isLoading={loading}w="full" colorScheme={'green'} type="submit">Change Password</Button>

        </VStack>
      </form>
    </Container>
  );
}

export default ChangePassword