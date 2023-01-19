import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getAnimeEpisodes } from '../../redux/actions/anime';
import Loader from '../Layout/Loader/Loader';

const AnimePage = ({user}) => {

    const [episodeNumber,setEpisodeNumber] = useState(0);

    const { episodes, loading } = useSelector(state => state.anime);

    // const episodes1 = [
    //   {
    //     _id: 'sdsdsdsd',
    //     title: 'Episode 1',
    //     description: 'loremsndksndks',
    //     video: {
    //       url: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
    //     },
    //   },
    //   {
    //     _id: 'sdsdsdsd2',
    //     title: 'Episode 2',
    //     description: 'loremsndksndks',
    //     video: {
    //       url: { introVideo },
    //     },
    //   },
    //   {
    //     _id: 'sdsdsdsd3',
    //     title: 'Episode 3',
    //     description: 'loremsndksndks',
    //     video: {
    //       url: { introVideo },
    //     },
    //   },
    // ];

      // console.log(episodes[episodeNumber].title);
      // console.log(episodes1);
      console.log(episodes);


        const dispatch = useDispatch();
        const params = useParams();

    useEffect(() => {
      dispatch(getAnimeEpisodes(params.id));
    },[dispatch,params.id]);

    if(user.role!=="admin"  && (user.subscription===undefined || user.subscription.status!=="active") ){
      return <Navigate to={"/subscribe"}  />
    }


 return loading ? (
   <Loader />
 ) : (
   <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
     {episodes && episodes.length > 0 ? (
       <>
         <Box>
           <video
             width={'100%'}
             controls
             controlsList="nodownload  noremoteplayback"
             disablePictureInPicture
             disableRemotePlayback
             src={episodes[episodeNumber].video.url}
           ></video>

           <Heading
             m="4"
             children={`#${episodeNumber + 1} ${
               episodes[episodeNumber].title
             }`}
           />
           <Heading m="4">Description</Heading>

           <Text m="4" children={episodes[episodeNumber].description} />
         </Box>

         <VStack>
           {episodes.map((element, index) => {
             return (
               <button
                 onClick={() => setEpisodeNumber(index)}
                 key={element._id}
                 style={{
                   width: '100%',
                   padding: '1rem',
                   textAlign: 'center',
                   margin: '0',
                   borderBottom: '1px solid rgba(0,0,0,0.2)',
                 }}
               >
                 <Text noOfLines={1}>
                   #{index + 1} {element.title}
                 </Text>
               </button>
             );
           })}
         </VStack>
       </>
     ) : (
       <Heading children="No Episodes" />
     )}
   </Grid>
 );
}

export default AnimePage