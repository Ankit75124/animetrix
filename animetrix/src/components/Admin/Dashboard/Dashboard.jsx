import { Box, Grid, Heading, HStack, Progress, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { RiArrowDownFill, RiArrowUpLine } from 'react-icons/ri';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { DoughnutChart, LineChart } from './Chart';

const Databox = ({ title, qty, qtyPercentage, profit }) => (
  <Box
    w={['full', '20%']}
    boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    p="8"
    borderRadius={'lg'}
  >
    <Text children={title} />

    <HStack spacing={'8'}>

    <Text fontSize={"2xl"} fontWeight="bold">{qty}</Text>
      <HStack>
        <Text children={`${qtyPercentage}%`} />

        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownFill color="red" />
        )}
      </HStack>
    </HStack>

    <Text children="From last month" opacity="0.6" />
  </Box>
);


const Bar =({title, value,profit}) =>(
  <Box py="4" px={["0","20"]}>
    <Heading size="sm" children ={title} mb="2" />

    <HStack w="full" alignItems={"center"} >

      <Text>{profit ? '0%' : `-${value}%`}</Text>

      <Progress w="full" value={profit ? value :0} colorScheme="purple"/>

      <Text children={`${value>100?value:100}%`} />


    </HStack>
  </Box>
)

const Dashboard = () => {
  return (
    <Grid
      minH="100vh"
      templateColumns={['1fr', '5fr 1fr']}
      css={{
        cursor: `url(${cursor}),default`,
      }}
    >
      <Box boxSizing="border-box" py="16" px={['4', '0']}>
        <Text
          textAlign={'center'}
          opacity="0.5"
          children={`Last change was made on ${
            String(new Date()).split('G')[0]
          }`}
        />

        <Heading
          textAlign={['center', 'left']}
          children="Dashboard"
          ml={['0', '16']}
          mb={'16'}
        />

        <Stack
          direction={['column', 'row']}
          minH="24"
          justifyContent={'space-evenly'}
        >
          <Databox title="Views" qty={123} qtyPercentage={30} profit={false} />
          <Databox title="Users" qty={20} qtyPercentage={78} profit={true} />
          <Databox
            title="Subscriptions"
            qty={9}
            qtyPercentage={20}
            profit={false}
          />
        </Stack>

        <Box
          m={['0', '16']}
          borderRadius="lg"
          p={['0', '16']}
          mt={['4', '16']}
          boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
        >
          <Heading
            textAlign={['center', 'left']}
            size="md"
            children="Views Graph"
            pt={['8', '0']}
            ml={['0', '16']}
          />

          {/* Line Graph */}

          <LineChart />
        </Box>

        <Grid templateColumns={['1fr', '2fr 1fr']}>
          <Box p="4">
            <Heading
              textAlign={['center', 'left']}
              size="md"
              children="Progress Bar"
              my="8"
              ml="16"
            />

            <Box>
              <Bar profit={true} title="views" value={30} />
              <Bar profit={true} title="Users" value={78} />
              <Bar profit={false} title="Subscriptions" value={20} />
            </Box>
          </Box>

          <Box p={["0","16"]}
          boxSizing="border-box" 
          >

          <Heading textAlign={"center"}
          size="md" 
          mb="4"
          children="Users" />

          <DoughnutChart />

          </Box>
        </Grid>
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
