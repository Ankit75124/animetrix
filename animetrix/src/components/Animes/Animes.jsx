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
import { Link } from 'react-router-dom';

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

  const addToPlaylistHandler =() =>{
    console.log("Added to playlist");
  }

  const categories = [
    'Action',
    'Romantic',
    'Comedy',
    'Blood-Shed',
    'Horror',
    'Shoenun',
  ];

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
        <Anime
          title={'Naruto'}
          description={
            'Naruto is a Japanese manga series written and illustrated by Masashi Kishimoto. It tells the story of Naruto Uzumaki, an adolescent ninja who searches for recognition from his peers and the village and also dreams of becoming the Hokage, the leader of his village.'
          }
          views={23}
          imageSrc={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdZxCio-JALtZIzC161Lk8_RokeudTsvjCTQ&usqp=CAU'
          }
          creator={'Masashi Kishimoto'}
          episodeCount={500}
          addToPlaylistHandler={addToPlaylistHandler}
        />
      </Stack>
    </Container>
  );
};

export default Animes;
