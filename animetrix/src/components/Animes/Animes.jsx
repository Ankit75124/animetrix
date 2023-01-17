import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllAnimes } from '../../redux/actions/anime';

const Anime=({views, title, imageSrc, id, addToPlaylistHandler, creator, description,episodeCount}) =>{
    return (
      <VStack className="anime" alignItems={['center', 'flex-start']}>
        <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
        <Heading
          textAlign={['center', 'left']}
          maxW="200px"
          fontFamily={'sans-serif'}
          size={'sm'}
          noOfLines={3}
          children={title}
        />
        <Text noOfLines={2} children={description} />

        <HStack>
          <Text
            fontWeight={'bold'}
            textTransform="uppercase"
            children="Creator :-"
          />
          <Text
            fontFamily={'body'}
            textTransform="uppercase"
            children={creator}
          />
        </HStack>

        <Heading
          textAlign={'center'}
          size="xs"
          children={`Episodes :- ${episodeCount}`}
          textTransform="uppercase"
        />
        <Heading
          size="xs"
          children={`Views :- ${views}`}
          textTransform="uppercase"
        />

        <Stack direction={['column', 'row']} alignItems="center">
          <Link to={`/anime/${id}`}>
            <Button colorScheme={"green"}>
              Watch Now
            </Button>
          </Link>
          <Button variant={"ghost"} colorScheme={"green"} onClick={() =>addToPlaylistHandler(id)}>
            Add to Playlist
          </Button>
        </Stack>
      </VStack>
    );
}


const Animes = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const addToPlaylistHandler =(animeId) =>{
    console.log("Added to playlist",animeId);

  }

  const categories = [
    'Action',
    'Romantic',
    'Comedy',
    'Blood-Shed',
    'Horror',
    'Shoenun',
  ];

  const { loading,animes,error } = useSelector(state => state.anime);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAnimes(category, keyword));

        if (error) {
        toast.error(error);
        dispatch({ type: 'clearError' });
        }
  }, [category, keyword,dispatch,error]);

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading children="All Animes" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search for an anime...."
        type={'text'}
        focusBorderColor="green.500"
      />
      <HStack
        overflowX={'auto'}
        paddingY="8"
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {animes.length>0?
          animes.map((item) => (
            <Anime
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              episodeCount={item.noOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
            />
          )):<Heading mt="4" children="No Animes Found" />}
      </Stack>
    </Container>
  );
};

export default Animes;
