import React, { Fragment, useState, useEffect } from 'react'
import {
    Flex,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    Text,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearState, loginUser } from '../redux/userSlice'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const history = useHistory()
    const toast = useToast()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const { isFetching, isSuccess, errorMessage } = useSelector(
        (state) => state.user
    )

    useEffect(() => {
        dispatch(clearState())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(clearState())

        dispatch(loginUser({ email, password }))
    }

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: 'successfully logged in.',
                status: 'success',
                duration: 1000,
                isClosable: true,
            })

            window.setTimeout(() => {
                history.push('/')
            }, 1500)
        }
    }, [isSuccess, history, toast])

    return (
        <Fragment>
            <Helmet>
                <title>Auth :: Login</title>
                <meta name="description" content="Log into registered user" />
            </Helmet>
            <Flex direction="column" p="12" rounded="6" background="gray.700">
                <Heading mb="6">Log In</Heading>
                <form>
                    <FormControl
                        id="email"
                        mb="4"
                        isInvalid={errorMessage.email}
                    >
                        <FormLabel>Email address</FormLabel>
                        <Input
                            name="email"
                            type="email"
                            placeholder="john@smith.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormErrorMessage>
                            {errorMessage.email}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        id="password"
                        mb="4"
                        isInvalid={errorMessage.password}
                    >
                        <FormLabel>Password</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormErrorMessage>
                            {errorMessage.password}
                        </FormErrorMessage>
                    </FormControl>
                    <Button
                        isLoading={isFetching}
                        display="block"
                        w="100%"
                        colorScheme="teal"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Log In
                    </Button>
                </form>
                <Link to="/forgot-password">
                    <Button
                        colorScheme="yellow"
                        display="block"
                        w="100%"
                        mt="3"
                    >
                        Forgot Password
                    </Button>
                </Link>
                <Link to="/register">
                    <Text mt="5" textAlign="center" textDecoration="underline">
                        Move to registration
                    </Text>
                </Link>
            </Flex>
        </Fragment>
    )
}

export default Login
