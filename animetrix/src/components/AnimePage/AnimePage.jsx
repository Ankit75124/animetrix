import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import introVideo from '../../assets/videos/intro.mp4';

const AnimePage = () => {

    const [episodeNumber,setEpisodeNumber] = useState(0);

    const episodes = [
      {
        _id: 'sdsdsdsd',
        title: 'Episode 1',
        description: 'loremsndksndks',
        video: {
          url: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
        },
      },
      {
        _id: 'sdsdsdsd2',
        title: 'Episode 2',
        description: 'loremsndksndks',
        video: {
          url: { introVideo },
        },
      },
      {
        _id: 'sdsdsdsd3',
        title: 'Episode 3',
        description: 'loremsndksndks',
        video: {
          url: { introVideo },
        },
      },
    ];


  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      <Box>
        <video
        width={"100%"}
          controls
          controlsList="nodownload  noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={introVideo}
        ></video>


        <Heading m="4"children={`#${episodeNumber+1} ${episodes[episodeNumber].title}`} />
        <Heading m="4">Description</Heading>

        <Text 
        m="4"
        children={episodes[episodeNumber].description}
          />
      </Box>

      <VStack>
        {
            episodes.map((element,index) => {
            return (   
                <button
                onClick={() => setEpisodeNumber(index)}
                key={element._id}
                style={{
                    width:"100%",
                    padding:"1rem",
                    textAlign:"center",
                    margin: "0",
                    borderBottom: "1px solid rgba(0,0,0,0.2)",
                }}
                >
                  <Text noOfLines={1}>
                    #{index + 1} {element.title}
                  </Text>
                </button>

            )
            })
        }

      </VStack>
    </Grid>
  );
}

export default AnimePage