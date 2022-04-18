import { Box, Text, Flex } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import GradientLayout from '../components/gradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'

const Home = ({ artists }) => {
  const { user } = useMe()

  return (
    <GradientLayout
      color="purple"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} Public Playlists`}
      image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
      roundImage
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="sm">Only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%">
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="https://assets.gqindia.com/photos/60c86d887829f66368dd34be/1:1/w_1080,h_1080,c_limit/Lil%20Dicky.jpg"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

// next.js function, only runs server-side and never on browser
export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})
  // console.log(artists)
  return {
    props: { artists },
  }
}

export default Home
