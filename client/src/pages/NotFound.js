import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { Flex, Heading, Button, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <Fragment>
            <Helmet>
                <title>Shorty :: 404</title>
                <meta name="description" content="Page not found" />
            </Helmet>
            <Flex direction="column" p="12" rounded="6">
                <Heading as="h1" fontSize="8xl">
                    404
                </Heading>
                <Text textAlign="center" mb="6" fontSize="2xl" color="gray.500">
                    Page not found
                </Text>
                <Link to="/">
                    <Button display="block" w="100%" colorScheme="teal">
                        Return to Home
                    </Button>
                </Link>
            </Flex>
        </Fragment>
    )
}

export default NotFound
