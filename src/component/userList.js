import React, { Component } from 'react';
import { connect } from 'react-redux';
import {userList} from "../state/action"
import '../css/table.css'


class UserList extends Component {
   constructor(props){
     super(props)
     this.props.userList();
   }

  render() {
    console.log("this.props:::",this.props);
    return (
      <React.Fragment>
        <h2>User Information</h2>
        <table>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Login Name</th>
            <th>Phone Number</th>
            <th>Country</th>
            <th>Edit</th>
          </tr>
          {this.props.userDetails.map((obj,k) =>
            <tr key={k}>
              <td>{obj.full_name}</td>
              <td>{obj.email}</td>
              <td>{obj.login}</td>
              <td>{obj.mobile}</td>
              <td>{obj.country}</td>
              <td><button onClick={()=>this.props.history.push(`/signUp/${obj._id}/edit`)}>Edit</button></td>
            </tr>
          )}
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = reduxState => {
  console.log("reduxState:: data",reduxState)
  const newState = {
    userDetails:reduxState.user.userlist,
  }
  console.log("userList::",newState)
  return newState;
}

const mapDispatchToProps = dispatch => {
  return {
  userList:()=> dispatch(userList())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserList);