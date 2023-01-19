import { Box, Button, Grid, Heading, HStack, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import AnimeModal from './AnimeModal';
import { getAllAnimes, getAnimeEpisodes } from '../../../redux/actions/anime';
import { addEpisode, deleteAnime, deleteEpisode } from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';

const AdminAnimes = () => {

  const { animes, episodes} = useSelector(state => state.anime);
  const { loading,error, message } = useSelector(state => state.admin);

  const [animeId, setAnimeId] = useState('');
  const [animeTitle, setAnimeTitle] = useState('');




  const dispatch = useDispatch();

  const animeDetailsHandler = (animeId,title,description) => {
    dispatch(getAnimeEpisodes(animeId));
    onOpen();
    setAnimeId(animeId);
    setAnimeTitle(title);

  };

  const deleteButtonHandler = animeId => {
    console.log(animeId);
    dispatch(deleteAnime(animeId));
  };

  const deleteEpisodeButtonHandler =async  (animeId,episodeId) =>{
    console.log(animeId)
    console.log(episodeId)
  await dispatch(deleteEpisode(animeId,episodeId));
  dispatch(getAnimeEpisodes(animeId));
  }

  const addLectureHandler =async(e,animeId,title,description,video) =>{
    e.preventDefault();

    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);
    await dispatch(addEpisode(animeId,myForm));
    dispatch(getAnimeEpisodes(animeId));
  }

    const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllAnimes());
  }, [dispatch, error, message,onClose]);
  


  return (
    <Grid
      minH="100vh"
      templateColumns={['1fr', '5fr 1fr']}
      css={{
        cursor: `url(${cursor}),default`,
      }}
    >
      <Box p={['0', '8']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          my="16"
          textAlign={['center', 'left']}
          children={'All Animes'}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant="simple" size="lg">
            <TableCaption>All Available animes in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Episodes</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {animes.map(item => (
                <Row
                  animeDetailsHandler={animeDetailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  key={item._id}
                  item={item}
                  loading={loading}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <AnimeModal
          isOpen={isOpen}
          id={animeId}
          animeTitle={animeTitle}
          onClose={onClose}
          deleteButtonHandler={deleteEpisodeButtonHandler}
          addLectureHandler={addLectureHandler}
          episodes={episodes}
          loading={loading}
        />
      </Box>

      <Sidebar />
    </Grid>
  );
};




function Row({ item, animeDetailsHandler, deleteButtonHandler,loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} h="30px" />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>

      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.noOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            color="purple.500"
            onClick={() =>
              animeDetailsHandler(item._id, item.title, item.description)
            }
            isLoading={loading}
          >
            View Episodes
          </Button>
          <Button
            color="purple.600"
            onClick={() => deleteButtonHandler(item._id)}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
export default AdminAnimes;
