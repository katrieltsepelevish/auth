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
import { clearState, registerUser } from '../redux/userSlice'
import { useHistory } from 'react-router-dom'

const Register = () => {
    const history = useHistory()
    const toast = useToast()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, SetPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const { isFetching, isSuccess, errorMessage } = useSelector(
        (state) => state.user
    )

    useEffect(() => {
        dispatch(clearState())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(registerUser({ name, email, password, confirmPassword }))
    }

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: 'successfully registered.',
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
                <title>Auth :: Registraton</title>
                <meta name="description" content="Register new user" />
            </Helmet>
            <Flex direction="column" p="12" rounded="6" background="gray.700">
                <Heading mb="6">Register</Heading>
                <form>
                    <FormControl id="name" mb="4" isInvalid={errorMessage.name}>
                        <FormLabel>Name</FormLabel>
                        <Input
                            name="name"
                            type="text"
                            placeholder="John Smith"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <FormErrorMessage>{errorMessage.name}</FormErrorMessage>
                    </FormControl>
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
                            onChange={(e) => SetPassword(e.target.value)}
                        />
                        <FormErrorMessage>
                            {errorMessage.password}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl
                        id="confirm-password"
                        mb="4"
                        isInvalid={errorMessage.confirmPassword}
                    >
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            name="confirm-password"
                            type="password"
                            placeholder="********"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <FormErrorMessage>
                            {errorMessage.confirmPassword}
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
                        Register
                    </Button>
                </form>
                <Link to="/login">
                    <Text mt="5" textAlign="center" textDecoration="underline">
                        Move to login
                    </Text>
                </Link>
            </Flex>
        </Fragment>
    )
}

export default Register
