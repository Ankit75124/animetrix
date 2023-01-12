import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { fileUploadCss } from '../../Auth/Register';

const AnimeModal = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  addLectureHandler,
  animeTitle,
  episodes = [1,2,3,4,5,6,7,8,9,10],
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };
  const handleClose=() =>{
    // console.log("close clicked");
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
    onClose();
  }
  return (
    <Modal isOpen={isOpen} size="full" onClose={handleClose}
    scrollBehavior="outside">
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>{animeTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="16">
            <Grid templateColumns={['1fr', '3fr 1fr']}>
              <Box px={['0', '16']}>
                <Box my="5">
                  <Heading children={animeTitle} />
                  <Heading children={`#${id}`} size="sm" opacity={0.4} />
                </Box>

                <Heading children={'Episodes'} size={'lg'} />

                {
                    episodes.map((item,i) =>{
                    return    <VideoCard
                          title="Pilot"
                          key={i}
                          description="1st episode of Naruto, story of naurjsdjsdjs dfd"
                          num={1}
                          episodeId="sdfsfdfsdsd ----- episodeId  "
                          animeId={id}
                          deleteButtonHandler={deleteButtonHandler}
                        />;
                    })
                }
                
              </Box>

              <Box>
                <form
                  onSubmit={e =>
                    addLectureHandler(e, id, title, description, video)
                  }
                >
                  <VStack spacing={'4'}>
                    <Heading
                      children="Add episodes"
                      size="md"
                      textTransform={'uppercase'}
                    />

                    <Input
                      focusBorderColor="purple.300"
                      placeholder={'Title'}
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                    <Input
                      focusBorderColor="purple.300"
                      placeholder={'Description'}
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />

                    <Input
                      accept="video/mp4"
                      required
                      type={'file'}
                      focusBorderColor={'purple.300'}
                      css={{
                        '&::file-selector-button ': {
                          ...fileUploadCss,
                          color: 'purple',
                        },
                      }}
                      onChange={changeVideoHandler}
                    />

                    {videoPrev && (
                      <video
                        controlsList="nodownload"
                        controls
                        src={videoPrev}
                      ></video>
                    )}
                    <Button w="full" colorScheme={'purple'} type="submit">
                      Upload
                    </Button>
                  </VStack>
                </form>
              </Box>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default AnimeModal;

function VideoCard({
  title,
  description,
  num,
  episodeId,
  animeId,
  deleteButtonHandler,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107, 70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size="sm" children={`#${num} ${title}`} />
        <Text children={description} />
      </Box>
      <Button
        color={'purple.600'}
        onClick={() => deleteButtonHandler(animeId, episodeId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
