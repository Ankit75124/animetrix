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
import { Link, useNavigate } from 'react-router-dom';
import { getAllAnimes } from '../../redux/actions/anime';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

const Anime = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
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
        children={`Episodes :- ${lectureCount}`}
        textTransform="uppercase"
      />
      <Heading
        size="xs"
        children={`Views :- ${views}`}
        textTransform="uppercase"
      />

      <Stack direction={['column', 'row']} alignItems="center">
        <Link to={`/anime/${id}`}>
          <Button colorScheme={'green'}>Watch Now</Button>
        </Link>
        <Button
          variant={'ghost'}
          colorScheme={'green'}
          onClick={() => addToPlaylistHandler(id)}
          isLoading={loading}
        >
          Add to Playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Animes = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addToPlaylistHandler = async animeId => {
    // console.log('Added to playlist', animeId);

    await dispatch(addToPlaylist(animeId));
    dispatch(loadUser());
    navigate('/profile');
  };

  const categories = [
    'Shounen',
    'Action',
    'Adventure',
    'Romantic',
    'Sports',
    'Horror',
    'Comedy',
  ];

  const { loading, animes, error, message } = useSelector(state => state.anime);

  useEffect(() => {
    dispatch(getAllAnimes(category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, dispatch, error, message]);

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
        {animes.length > 0 ? (
          animes.map(item => {
            console.log(
              item._id,
              item.title,
              item.description,
              item.views,
              item.poster.url,
              item.createdBy,
              item.noOfVideos
            );
            return (
              <Anime
                key={item._id}
                title={item.title}
                description={item.description}
                views={item.views}
                imageSrc={item.poster.url}
                id={item._id}
                creator={item.createdBy}
                lectureCount={item.noOfVideos}
                addToPlaylistHandler={addToPlaylistHandler}
                loading={loading}
              />
            );
          })
        ) : (
          <Heading mt="4" children="Anime Not Found" />
        )}
      </Stack>
    </Container>
  );
};

export default Animes;
