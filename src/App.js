import React, {
  Component
} from 'react';
import 'semantic-ui-css/semantic.min.css'
import NavBar from './component/NavBar/NavBar'
import {
  Switch,
  Route,
  withRouter,
  Redirect
} from 'react-router-dom'
import Restaurants from './component/ViewAll/RestaurantList'
import UserProfile from './component/UserProfile/UserProfile'

class App extends Component {
  state = {
    currentUser: null
  }

  doSetCurrentUser(user) {
    this.setState({
      currentUser: user
    })
  }



  render() {
    return ( <
      div >
      <
      NavBar currentUser = {
        this.state.currentUser
      }
      doSetCurrentUser = {
        this.doSetCurrentUser
      }
      doLogout = {
        null
      }
      /> <
      UserProfile / >



      <
      /div>
    )
  };
}

export default withRouter(App);