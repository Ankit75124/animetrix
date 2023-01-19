import { Box, Button, Grid, Heading, HStack, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import AnimeModal from './AnimeModal';
import { getAllAnimes } from '../../../redux/actions/anime';

const AdminAnimes = () => {
  // const animes = [
  //   {
  //     _id: '123',
  //     title: 'Naruto',
  //     category: 'shonen',
  //     poster: {
  //       url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdZxCio-JALtZIzC161Lk8_RokeudTsvjCTQ&usqp=CAU',
  //     },
  //     createdBy: 'Nishimoto',
  //     views:123,
  //     numofVideos:12,
  //   },
  // ];

  const {animes} = useSelector(state => state.anime);
  const dispatch = useDispatch();

  const animeDetailsHandler = userId => {
    onOpen();
  };

  const deleteButtonHandler = userId => {
    console.log(userId);
  };

  const deleteEpisodeButtonHandler = (animeId,episodeId) =>{
    console.log(animeId)
    console.log(episodeId)
  }

  const addLectureHandler =(e,animeId,title,description,video) =>{
    e.preventDefault();

  }

  useEffect(() => {
    dispatch(getAllAnimes());
  }, [dispatch])
  

  const {isOpen, onClose, onOpen} =useDisclosure();
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
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <AnimeModal
          isOpen={isOpen}
          id={"45678823847839"}
          animeTitle="Naruto"
          onClose={onClose}
          deleteButtonHandler={deleteEpisodeButtonHandler}
          addLectureHandler={addLectureHandler}
        />
      </Box>

      <Sidebar />
    </Grid>
  );
};




function Row({ item, animeDetailsHandler, deleteButtonHandler }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} h="30px"/>
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>

      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numofVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            variant={'outline'}
            color="purple.500"
            onClick={() => animeDetailsHandler(item._id)}
          >
            View Episodes
          </Button>
          <Button
            color="purple.600"
            onClick={() => deleteButtonHandler(item._id)}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
export default AdminAnimes;
