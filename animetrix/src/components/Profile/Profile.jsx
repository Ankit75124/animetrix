import { Avatar, Button, Container, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { fileUploadCss } from '../Auth/Register';

const Profile = () => {

    const user = {
        name: "Katomekichi",
        email: "antivirus076@gmail.com",
        createdAt:String(new Date().toISOString()),
        role: "reg",
        subscription:{
            status:"active"
        },
        playlist:[
            {
                anime:"asddd",
                poster:"https://cdn.myanimelist.net/images/anime/5/87048.jpg",
            }
        ]
    }

    const removeFromPlaylistHandler = id =>{
        console.log(id);
    }

    const changeImageSubmitHandler = (e, image) => {
        e.preventDefault();
        console.log(image);
    };

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
          <Avatar boxSize={'48'} />

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

          {user.role === 'admin' && (
            <HStack>
              {user.subscription.status === 'active' ? (
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

                        <Button onClick={() => removeFromPlaylistHandler(element.anime)}>
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
       />


    </Container>
  );
}

export default Profile;

function ChangePhotoBox({isOpen, onClose,changeImageSubmitHandler})
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

              <Button w="full" colorScheme="green" type="submit">
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