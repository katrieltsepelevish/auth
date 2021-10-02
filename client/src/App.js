import './App.css'

import { Flex } from '@chakra-ui/react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

// Import pages
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import NotFound from './pages/NotFound'
import ConfirmEmail from './pages/ConfirmEmail'

function App() {
    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Router>
                <Switch>
                    <PrivateRoute exact component={Dashboard} path="/" />
                    <PublicRoute
                        restricted={true}
                        exact
                        component={Login}
                        path="/login"
                    />
                    <PublicRoute
                        restricted={true}
                        exact
                        component={Register}
                        path="/register"
                    />
                    <PublicRoute
                        restricted={true}
                        exact
                        component={ResetPassword}
                        path="/reset-password/:token"
                    />
                    <PublicRoute
                        restricted={true}
                        exact
                        component={ForgotPassword}
                        path="/forgot-password"
                    />
                    <PrivateRoute
                        exact
                        component={ConfirmEmail}
                        path="/confirm-email/:code"
                    />
                    <PublicRoute
                        restricted={false}
                        exact
                        component={NotFound}
                        path="/404"
                    />
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </Flex>
    )
}

export default App
