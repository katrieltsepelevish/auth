import React, { Fragment, useState, useEffect } from 'react'
import {
    Flex,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Text,
    useToast,
} from '@chakra-ui/react'
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, clearState } from '../redux/userSlice'

const ForgotPassword = () => {
    const history = useHistory()
    const toast = useToast()

    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const { isFetching, isSuccess, errorMessage } = useSelector(
        (state) => state.user
    )

    useEffect(() => {
        dispatch(clearState())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(forgotPassword(email))
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState())

            toast({
                title: 'Password Reset Send',
                description: 'Please view your email inbox...',
                status: 'success',
                duration: 2000,
                isClosable: true,
            })

            window.setTimeout(() => {
                history.push('/')
            }, 2500)
        }
    }, [isSuccess, history, dispatch, toast])

    return (
        <Fragment>
            <Helmet>
                <title>Auth :: Forgot Password</title>
                <meta
                    name="description"
                    content="Send forgot password reset mail"
                />
            </Helmet>
            <Flex direction="column" p="12" rounded="6" background="gray.700">
                <Heading mb="6">Forgot Password</Heading>
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
                    <Button
                        isLoading={isFetching}
                        display="block"
                        w="100%"
                        colorScheme="teal"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Send Password Reset Link
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

export default ForgotPassword
