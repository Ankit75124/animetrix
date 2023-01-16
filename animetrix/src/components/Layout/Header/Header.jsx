import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react'
import  {ColorModeSwitcher} from '../../../ColorModeSwitcher';
import {RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill} from 'react-icons/ri';
import { Link } from 'react-router-dom';



const LinkButton = ({url = '/', title = 'Home',onClose}) => {
  return (
    <Link onClick={onClose} to={url}>
      <Button variant={'ghost'}>{title}</Button>
    </Link>
  );
};

const Header = ({isAuthenticated=false,user}) => {

    const {isOpen, onOpen, onClose} = useDisclosure();


    const logoutHandler = () => {
        console.log('logout');
        onClose();
    };

  return (
    <>
      <ColorModeSwitcher />

      <Button
        onClick={onOpen}
        colorScheme={'yellow'}
        width={'12'}
        height={'12'}
        rounded="full"
        position={'fixed'}
        top="6"
        left="6"
        zIndex="overlay"
      >
        <RiMenu5Fill />
      </Button>

      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay
        // backdropFilter={"blur(3px)"}
        />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>AnimeTrix</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems="flex-start">
              <LinkButton onClose={onClose} url={'/'} title={'Home'} />
              <LinkButton
                onClose={onClose}
                url={'/animes'}
                title={'Browse All Animes'}
              />
              <LinkButton
                onClose={onClose}
                url={'/request'}
                title={'Request a Anime'}
              />
              <LinkButton
                onClose={onClose}
                url={'/contact'}
                title={'Contact Us'}
              />
              <LinkButton onClose={onClose} 
              url={'/about'} title={'About'} />

              <HStack
                justifyContent={'space-evenly'}
                position="absolute"
                bottom={'2rem'}
                width="80%"
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link onClick={onClose} to="/profile">
                          <Button variant={'ghost'} colorScheme={'yellow'}>
                            Profile
                          </Button>
                        </Link>
                        <Button variant={'ghost'} onClick={logoutHandler}>
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                      </HStack>
                      {user && user.role === 'admin' && (
                        <Link onClick={onClose} to="/admin/dashboard">
                          <Button colorScheme={'purple'} variant="ghost">
                            <RiDashboardFill style={{ margin: '4px' }} />
                            DashBoard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link onClick={onClose} to="/login">
                      <Button colorScheme={'yellow'}>Login</Button>
                    </Link>

                    <p>OR</p>
                    <Link onClick={onClose} to="/register">
                      <Button colorScheme={'yellow'}>Signup</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Header
