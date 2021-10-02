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
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, clearState } from '../redux/userSlice'
import { useHistory, useParams } from 'react-router-dom'

const ResetPassword = () => {
    const history = useHistory()
    const { token } = useParams()

    const toast = useToast()

    const [password, setPassword] = useState('')
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

        dispatch(resetPassword({ token, password, confirmPassword }))
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState())

            toast({
                title: 'Password reset successfully!',
                description: 'Please log into your user...',
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
                <title>Auth :: Reset Password</title>
                <meta name="description" content="Reset user password" />
            </Helmet>
            <Flex direction="column" p="12" rounded="6" background="gray.700">
                <Heading mb="6">Reset Your Password</Heading>
                <form>
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
                        Reset Password
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

export default ResetPassword
