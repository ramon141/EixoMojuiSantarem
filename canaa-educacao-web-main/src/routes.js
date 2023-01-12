import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login/';
import About from './pages/About/';
import Travel from './pages/Travel/';
import ConfirmBoarding from './pages/ConfirmBoarding/';
import Unboarding from './pages/Unboarding/';
import ChoiceTypeTravel from './pages/ChoiceTypeTravel/';
import UserEdit from './pages/UserEdit';
import UserRegister from './pages/UserRegister';
import RegisterStudent from './pages/RegisterStudent';
import ManagerStudent from './pages/ManagerStudent';
import RegisterSchool from './pages/RegisterSchool';
import Shipment from './pages/Shipment';
import { isAuthenticated } from "./services/auth";
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import AttendanceReport from './pages/AttendanceReport/';
import EditStudent from './pages/EditStudent'
import New from './pages/Manager/New';

/* Função destinada para possibilitar acesso somente as rotas com autenticação */
const PrivateRoute = ({ component: Component, roles, ...rest }) => (

  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes() {
  return (
    <Switch>
      {/* Rotas acessadas sem autenticação */}
      <Route path='/' exact component={Login} />
      <Route path="/signup" component={() => <h1>SignUp</h1>} />
      <>
        {/*<Navbar/>*/}
        <Sidebar>
          {/* Rotas acessadas somente com autenticação */}
          <PrivateRoute path='/login' component={Login} />
          <PrivateRoute path='/confirm-boarding' component={ConfirmBoarding} />
          <PrivateRoute path='/choice-type-travel' component={ChoiceTypeTravel} />
          <PrivateRoute path='/unboarding' component={Unboarding} />
          <PrivateRoute path='/attendance-report' component={AttendanceReport} />
          <PrivateRoute path='/travel' component={Travel} />
          <PrivateRoute path='/about' component={About} />
          <PrivateRoute path='/shipments' component={Shipment} />
          <PrivateRoute path='/student-register' component={RegisterStudent} />
          <PrivateRoute path='/student-edit/:id' component={EditStudent} />
          <PrivateRoute path='/manager-student' component={ManagerStudent} />
          <PrivateRoute path='/school-register' component={RegisterSchool} />
          <PrivateRoute path='/userregister' component={UserRegister} />
          <PrivateRoute path='/useredit/:id' component={UserEdit} />
          <PrivateRoute path='/manager' component={New} />
          <PrivateRoute path='/manager-edit/:id' component={New} />
          <Footer />
        </Sidebar>
      </>
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  );
}