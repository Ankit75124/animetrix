import { Avatar, Button, Container, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromPlaylist, updateProfilePicture } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { fileUploadCss } from '../Auth/Register';

const Profile = ({user}) => {



    const dispatch = useDispatch();

    const {loading, message,error} = useSelector(state => state.user);

    
    const removeFromPlaylistHandler =async id => {
    await  dispatch(removeFromPlaylist(id));
    dispatch(loadUser());
    };

    const changeImageSubmitHandler =async (e, image) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.append('file', image);
      await dispatch(updateProfilePicture(myForm));
      dispatch(loadUser());
    };

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
      }
      if (message) {
        toast.success(message);
        dispatch({ type: 'clearMessage' });
      }
    }, [dispatch, error, message]);

    const {isOpen,onOpen,onClose} =useDisclosure();

  return (
    <Container maxW="container.lg" py={'8'} minH={'95vh'}>
      <Heading children="Profile" m="8" textTransform={'uppercase'} />

      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
        padding={'8'}
      >
        <VStack>
          <Avatar boxSize={'48'} src={user.avatar.url}/>

          <Button colorScheme={'green'} variant="ghost"
          onClick={onOpen}>
            Change Avatar
          </Button>
        </VStack>

        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text fontWeight={'bold'}>Name : </Text>
            <Text children={user.name} />
          </HStack>

          <HStack>
            <Text fontWeight={'bold'}>Email : </Text>
            <Text children={user.email} />
          </HStack>

          <HStack>
            <Text fontWeight={'bold'}>Since : </Text>
            <Text children={user.createdAt.split('T')[0]} />
          </HStack>

          {user.role !== 'admin' && (
            <HStack>
              {user.subscription && user.subscription.status === 'active' ? (
                <Button color="green">Cancel Subscription</Button>
              ) : (
                <Link to="/subscribe">
                  <Button colorScheme={'green'}>Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}

          <Stack direction={['column', 'row']} alignItems={'center'}>
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>

            <Link to="/changepassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>

          <HStack>
            <Text fontWeight={'bold'}>Role : </Text>
            <Text children={user.role} />
          </HStack>
        </VStack>
      </Stack>

      <Heading children="Playlist" size="md" my="8" />

      {user.playlist.length > 0 && (
        <Stack direction={['column', 'row']} alignItems={'center'}
        flexWrap="wrap"
        p="4">
            {
                user.playlist.map((element)=>(
                    <VStack w="48" m="2" key={element.anime}>
                    <Image boxSize={"full"} objectFit="contain" src={element.poster}/>

                    <HStack>

                        <Link to={`/anime/${element.anime}`}>
                        <Button colorScheme={'green'}
                        variant="ghost">Watch Now</Button>
                        </Link>

                        <Button onClick={() => removeFromPlaylistHandler(element.anime)} isLoading={loading}>
                            <RiDeleteBin7Fill />
                        </Button>
                    </HStack>

                    </VStack>
                ))
            }
        </Stack>
      )}

      <ChangePhotoBox
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        changeImageSubmitHandler={changeImageSubmitHandler}
        loading={loading}
       />


    </Container>
  );
}

export default Profile;

function ChangePhotoBox({isOpen, onClose,changeImageSubmitHandler, loading})
{   
    const [imagePrev, setImagePrev] = useState('');
    const [image, setImage] = useState('');

        const changeImageHandler = e => {
          const file = e.target.files[0];
          const reader = new FileReader();

          reader.readAsDataURL(file);

          reader.onload = () => {
            setImagePrev(reader.result);
            setImage(file);
          };
        };

        const closeHandler = () => {
            onClose();
            setImage('');
            setImagePrev('');
        }
return (
  <Modal isOpen={isOpen} onClose={closeHandler}>
    <ModalOverlay backdropFilter={'blur(10px)'} />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <Container>
          <form onSubmit={e => changeImageSubmitHandler(e, image)}>
            <VStack spacing="8">
              {imagePrev && <Avatar boxSize={'48'} src={imagePrev} />}
              <Input
                type="file"
                css={{
                  '&::file-selector-button': fileUploadCss,
                }}
                onChange={changeImageHandler}
              />

              <Button
                isLoading={loading}
                w="full"
                colorScheme="green"
                type="submit"
              >
                Change Avatar
              </Button>
            </VStack>
          </form>
        </Container>
      </ModalBody>

      <ModalFooter>
        <Button marginRight={'3'} onClick={closeHandler}>
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

}