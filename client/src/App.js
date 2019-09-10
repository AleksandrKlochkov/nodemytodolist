import React from 'react'
import Layout from './hoc/Layout/Layout'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'

import Home from './pages/Home/Home'
import CreateList from './pages/CreateList/CreateList'


function App() {
  return (
    <div>
        <Layout>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/create' component={CreateList}/>
            <Redirect to="/" />
          </Switch>
        </Layout>
    </div>
  );
}

export default withRouter(App);
