import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="skeletonLoad">
              <Box padding="6" boxShadow="lg" bg="white" w={500}>
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="6"
                />
              </Box>
              <Box padding="6" boxShadow="lg" bg="white" w={500}>
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="6"
                />
              </Box>
              <Box padding="6" boxShadow="lg" bg="white" w={500}>
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="6"
                />
              </Box>
              <Box padding="6" boxShadow="lg" bg="white" w={500}>
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="6"
                />
              </Box>
              <Box padding="6" boxShadow="lg" bg="white" w={500}>
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="6"
                />
              </Box>
              <Box padding="6" boxShadow="lg" bg="white" w={500}>
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="6"
                />
              </Box>
              <Box padding="6" boxShadow="lg" bg="white" w={500}>
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="6"
                />
              </Box>
              <Box padding="6" boxShadow="lg" bg="white" w={500}>
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="6"
                />
              </Box>
              <Box padding="6" boxShadow="lg" bg="white" w={500}>
                <SkeletonCircle size="10" />
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="6"
                />
              </Box>
            </div>
  );
}

export default LoadingSkeleton;
