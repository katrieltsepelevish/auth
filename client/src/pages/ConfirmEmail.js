import React, { useEffect, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { useParams } from 'react-router'
import { confirmEmail, clearState } from '../redux/userSlice'

const ConfirmEmail = () => {
    const { code } = useParams()

    const history = useHistory()
    const dispatch = useDispatch()

    const { isError, isSuccess } = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(confirmEmail(code))
    }, [code, dispatch])

    useEffect(() => {
        if (isError) {
            dispatch(clearState())
        }

        if (isSuccess) {
            dispatch(clearState())
            history.push('/')
        }
    }, [isError, isSuccess, dispatch, history])

    return (
        <Fragment>
            <Helmet>
                <title>Auth :: Confirming...</title>
                <meta
                    name="description"
                    content="Confirming user mail address"
                />
            </Helmet>
            <Flex direction="column" p="12" rounded="6">
                <Heading textAlign="center" as="h1" fontSize="6xl">
                    {isError ? 'Wait' : 'Oops'}
                </Heading>
                <Text
                    textAlign="center"
                    mb="6"
                    fontSize="2xl"
                    color={isError ? 'gray.500' : 'red'}
                >
                    {isError ? 'Confirming email...' : 'someting went wrong...'}
                </Text>
            </Flex>
        </Fragment>
    )
}

export default ConfirmEmail
