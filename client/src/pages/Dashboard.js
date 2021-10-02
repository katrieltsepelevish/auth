import React, { useEffect, useRef, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { useHistory } from 'react-router-dom'
import {
    Flex,
    Heading,
    Text,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useToast,
} from '@chakra-ui/react'
import { resendConfirmEmail, getUserInfo, clearState } from '../redux/userSlice'

const Dashboard = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const toast = useToast()

    // Popover variables
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const { isError, userInfo } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch])

    useEffect(() => {
        if (isError) {
            dispatch(clearState())
            history.push('/login')
        }
    }, [isError, dispatch, history])

    const handleLogout = () => {
        localStorage.removeItem('token')
        dispatch(clearState())

        history.push('/login')
    }

    const handleResendConfirmationEmail = () => {
        dispatch(resendConfirmEmail())

        toast({
            title: 'Email confirmation resent.',
            status: 'success',
            duration: 1000,
            isClosable: true,
        })
    }

    return (
        <Fragment>
            <Helmet>
                <title>Auth :: Dashboard</title>
                <meta name="description" content="Dashboard" />
            </Helmet>
            <Flex direction="column" p="12" rounded="6">
                <Heading textAlign="center" as="h1" fontSize="6xl">
                    Dashboard
                </Heading>
                <Text textAlign="center" mb="6" fontSize="2xl" color="gray.500">
                    Welcome back, {userInfo.name}!
                </Text>
                {userInfo.emailConfirmCode && (
                    <Alert
                        status="warning"
                        variant="subtle"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        textAlign="center"
                        height="200px"
                        mb="6"
                    >
                        <AlertIcon boxSize="40px" mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize="lg">
                            Confirm Your Email!
                        </AlertTitle>
                        <AlertDescription maxWidth="sm">
                            An email confirmation was requested for this email
                            address ({userInfo.email}).
                            <Button
                                colorScheme="yellow"
                                display="block"
                                w="100%"
                                mt="3"
                                onClick={handleResendConfirmationEmail}
                            >
                                Resend Confirmation Email
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}
                <Button
                    mr="5"
                    w="100%"
                    display="block"
                    onClick={() => setIsOpen(true)}
                >
                    Logout
                </Button>

                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    motionPreset="slideInBottom"
                    isCentered
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Logout
                            </AlertDialogHeader>

                            <AlertDialogBody>Are you sure?</AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    No
                                </Button>
                                <Button
                                    colorScheme="red"
                                    onClick={() => {
                                        onClose()
                                        handleLogout()
                                    }}
                                    ml={3}
                                >
                                    Yes
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Flex>
        </Fragment>
    )
}

export default Dashboard
