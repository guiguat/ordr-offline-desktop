import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useAuth } from '../Contexts/Auth';

import "../custom.scss";

import Login from '../Pages/Login';
import PrivateRoute from './PrivateRoute';
import Home from '../Pages/Home';
import Product from '../Pages/Product';
import Report from '../Pages/Report';
import Costumer from '../Pages/Costumer';
import Col from '../Components/Col';
import Container from '../Components/Container';
import NavBar from '../Components/NavBar';
import Config from '../Pages/Config';
import Sale from '../Pages/Sale';
import NewSale from '../Pages/Sale/NewSale';

const Routes: React.FC = () =>{
    const { currentUser } = useAuth();

    return ( 
        <Router>
            <Container>
                <Col type="nav" className={`${!!currentUser?'':'d-none'}`}>
                    <NavBar/>
                </Col>
                <Col>
                    <Switch>
                        <PrivateRoute 
                        isAuth={!!currentUser} 
                        path="/" 
                        redirectPath="/login"
                        exact 
                        component={Home}
                        />

                        <PrivateRoute
                        isAuth={!!currentUser}
                        path="/config"
                        redirectPath="/login"
                        component={Config}
                        />
                        
                        <PrivateRoute
                        isAuth={!!currentUser}
                        path="/product"
                        redirectPath="/login"
                        component={Product}
                        />

                        <PrivateRoute
                        isAuth={!!currentUser}
                        path="/report"
                        redirectPath="/login"
                        component={Report}
                        />

                        <PrivateRoute
                        isAuth={!!currentUser}
                        path="/costumer"
                        redirectPath="/login"
                        component={Costumer}
                        />
                        
                        <PrivateRoute
                        isAuth={!!currentUser}
                        path="/sale"
                        exact
                        redirectPath="/login"
                        component={Sale}
                        />

                        <PrivateRoute
                        isAuth={!!currentUser}
                        path="/sale/new"
                        exact
                        redirectPath="/login"
                        component={NewSale}
                        />

                        <Route path="/login" component={Login}/>
                    </Switch>
                </Col>
            </Container>
        </Router>
    );
}

export default Routes;