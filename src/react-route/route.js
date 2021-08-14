import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const LoaderAnimation = props => {
  return <span>Loading...</span>;
};

const signUp = lazy(() => import('../component/SignUp'));
const Login = lazy(() => import('../component/Login'));
const userList = lazy(()=> import('../component/userList'));


const Routes = () => {
  console.log('Routes called');
  return (
    <React.Fragment>
      <Suspense fallback={<LoaderAnimation />}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signUp" component={signUp} />
          <Route exect path="/userList" component={userList}/>
          <Route exect path="/signUp/:id/:action" component={signUp}/>
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </React.Fragment>
  );
};

export default withRouter(Routes);
