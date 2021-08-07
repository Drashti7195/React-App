import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../css/SignUp.css';
import { saveUserData, getDataFromUser, UpdateUser} from '../state/action';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      email: '',
      login: '',
      password: '',
      mobile: '',
      country: '',
      profileUrl: ''
    };
    console.log('props calls..', props);

    if (props.match.params.id) {
        this.props.getDataFromUser(props.match.params.id).then(()=>{
          const { full_name, email, login, password, mobile, country,profileUrl } = this.props.data;
          this.setState({ full_name, email, login, password, mobile, country,profileUrl });
        })
       
    }
  }

  changeFormValue = event => {
    console.log('changeFormValue::', event.target, event);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  registerUser = () => {
    if (this.props.match.params.id) {
      this.props.UpdateUser(this.props.match.params.id, this.state)
       .then(()=>{
        this.setState({ error: ' ' });
        this.props.history.push('/userList');
      })
       .catch(err=> this.setState({error: err.message }))
    
    } else {
      saveUserData(this.state)
        .then(() => {
         this.setState({ error: ' ' });
         this.props.history.push('/');
        })
        .catch(err => this.setState({ error: err.message }));
    }
  };

  imageUpload = event => {
    event.preventDefault();
    console.log('details:', event.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      console.log('reader', reader);
      this.setState({ file:event.target.files[0],profileUrl: reader.result });
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  render() {
    console.log('profileUrl:', this.state.profileUrl);
    return (
      <form onSubmit={e => e.preventDefault()}>
        <div className="container">
          <h1>User Information</h1>
          <p>Please fill in this form to create an account.</p>
          <div className="wrapper">
            <div className="fl-left">
              <label>
                <strong>Profile Image</strong>
              </label>
              <input type="file" onChange={e => this.imageUpload(e)} />
              <br />
            </div>
            <div className="fl-right">
              <div className="image-wrapper">
                <img className="img" src={this.state.profileUrl} alt="Profile IMG"></img>
              </div>
            </div>
          </div>

          <div>
            <label>
              <b>Full Name</b>
            </label>
            <input type="text" placeholder="Name" name="full_name" onChange={this.changeFormValue} value={this.state.full_name} required />
            <label>
              <b>Email</b>
            </label>
            <input type="text" placeholder="Email" name="email" onChange={this.changeFormValue} value={this.state.email} required />
            <label>
              <b>Login Name</b>
            </label>
            <input type="text" placeholder="Login Name" name="login" onChange={this.changeFormValue} value={this.state.login} required />
            <label>
              {' '}
              <b>Password</b>{' '}
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={this.changeFormValue}
              value={this.state.password}
              required
            />
            <label>
              {' '}
              <b>Mobile Number</b>{' '}
            </label>
            <input
              type="text"
              placeholder="Mobile Number"
              name="mobile"
              onChange={this.changeFormValue}
              value={this.state.mobile}
              required
            />
            <label>
              {' '}
              <b>Country</b>{' '}
            </label>
            <input type="text" placeholder="Country" name="country" onChange={this.changeFormValue} value={this.state.country} required />
            <div>
              {this.state.error !== '' && (
                <font color="red">
                  {' '}
                  <b>{this.state.error}</b>{' '}
                </font>
              )}
            </div>
            <button type="submit" className="registerbtn" onClick={this.registerUser}>
              {this.props.match.params.id ? <span>Update</span> : <span>Register</span>}
            </button>
            &nbsp;            
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = reduxState => {
  const newState = {
    data: reduxState.user.data,
  };
  return newState;
};

const mapDispatchToProps = dispatch => {
  return {
    getDataFromUser: id => dispatch(getDataFromUser(id)),
    UpdateUser: (id, data) => dispatch(UpdateUser(id, data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
