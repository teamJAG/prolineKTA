import React from 'react';
import { Grid } from 'semantic-ui-react';


// --------------------------- Create User State --------------------------------
const initialCreateState = {
  fname: '',
  lname: '',
  username: '',
  createEmail: '',
  createPassword: '',
  phone: '',
  address: '',
  fnameCreateError: '',
  lnameCreateError: '',
  usernameCreateError: '',
  emailreateError: '',
  passwordCreateError: '',
  phoneCreateError: '',
  addressCreateError: ''
}


// --------------------------- Login State -----------------------
const initialState = {
  name: '',
  email: '',
  password: '',
  nameError: '',
  emailError: '',
  passwordError: ''
}

export default class TestingForm extends React.Component {
  // -------------- Create user Functions ------------------------
  createState = initialCreateState;

  handleCreateChange = event => {
    const isCreateCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.fname] : isCreateCheckbox
      ? event.target.checked
      : event.target.value
    });
  };

  createValidate = () => {
    let fnameCreateError = '';
    let lnameCreateError = '';
    let usernameCreateError = '';
    let emailCreateError = '';
    let passwordCreateError = '';
    let phoneCreateError = '';
    let addressCreateError = '';

    if (!this.createState.createPassword) {
      passwordCreateError = "Please enter a valid password";
    } 

    if (!this.createState.fname) {
      fnameCreateError = "First name cannot be empty";
    }

    if (!this.createState.lname) {
      lnameCreateError = "last name cannot be empty";
    }

    if (!this.createState.username) {
      usernameCreateError = "username cannot be empty";
    }

    if (!this.createState.phone) {
      phoneCreateError = "Phone number cannot be empty";
    }

    if (!this.createState.address) {
      addressCreateError = "Address cannot be empty";
    }

    if (!this.createState.createEmail.includes("@")) {
      emailCreateError = "Email cannot be empty";
    }

    if (emailCreateError || fnameCreateError || lnameCreateError|| usernameCreateError || phoneCreateError || addressCreateError || passwordCreateError) {
      this.setState({emailCreateError, fnameCreateError, lnameCreateError, usernameCreateError, phoneCreateError, addressCreateError,  passwordCreateError});
      return false;
    }
      return true;
  };

  handleCreateSubmit = event => {
    event.preventDefault();
    const isCreateValid = this.createValidate();
    if (isCreateValid) {
      console.log(this.createState);  
    // clear form 
    this.setState(initialCreateState);
    }
  };

  // -------------- Login Functions ------------------------------
  state = initialState;

  handleChange = event => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
    [event.target.name] : isCheckbox
    ? event.target.checked
    : event.target.value
    });
  };

  validate = () => {
    let nameError = '';
    let emailError = '';
    let passwordError = '';

    if (!this.state.password) {
      passwordError = "Please enter a valid password";
    } 

    if (!this.state.name) {
      nameError = "Name cannot be blank";
    }

    if (!this.state.email.includes("@")) {
      emailError = "Email cannot be blank";
    }

    if (emailError || nameError || passwordError) {
      this.setState({emailError, nameError, passwordError});
      return false;
    }
      return true;
  };
  
  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);  
    // clear form 
    this.setState(initialState);
    }
  };

  render() {
    return(
      // ------------------------------------- Login Form -------------------------------------------
      <Grid centered columns={2}>
        <Grid.Column>
      <form class="ui form" onSubmit ={this.handleSubmit}>
        <div class="ui form very padded segment"> 
        <h2 class = "ui horizontal divider header"> Login Form </h2>
        <div class="field">
          <input
          type="text"
          name="name"
          placeholder="name"
          value={this.state.name}
          onChange={this.handleChange}
          />
            <div style={{fontSize: 12, color: "red"}}> 
              {this.state.nameError} 
            </div>
        </div>

        <div class="field">
          <input
          type="text"
          name="email"
          placeholder="email"
          value={this.state.email}
          onChange={this.handleChange}
          />
            <div style={{fontSize: 12, color: "red"}}> 
              {this.state.emailError} 
            </div>
          </div>

          <div class="field">
          <input
          name="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.handleChange}
          type="password"
          />
            <div style={{fontSize: 12, color: "red"}}> 
              {this.state.passwordError} 
            </div>
          </div>

        <button class="ui primary button" type="submit"> Submit </button>
        </div>
      </form>
      </Grid.Column>
      
      {/*  ------------------------------------- Create User Form --------------------------------------------------- */}
    <Grid.Column>
    <form class="ui form" onSubmit ={this.handleCreateSubmit}>

    <div class="ui form very padded segment"> 
        <h2 class = "ui horizontal divider header"> Create/Update User Form </h2>
        <div class = "fields"> 
        <div class="eight wide field">
          <input
          type="text"
          name="firstname"
          placeholder="first name"
          value={this.state.createFirstName}
          onChange={this.handleCreateChange}
          />
            <div style={{fontSize: 12, color: "red"}}> 
              {this.state.fnameCreateError} 
            </div>
        </div>

        <div class="eight wide field">
          <input
          type="text"
          name="lastname"
          placeholder="last name"
          value={this.state.createLastName}
          onChange={this.handleCreateChange}
          />
            <div style={{fontSize: 12, color: "red"}}> 
              {this.state.lnameCreateError} 
            </div>
        </div>
        </div>

        <div class="field">
          <input
          type="text"
          name="username"
          placeholder="username"
          value={this.state.createUsername}
          onChange={this.handleCreateChange}
          />
            <div style={{fontSize: 12, color: "red"}}> 
              {this.state.usernameCreateError} 
            </div>
        </div>

        <div class="field">
          <input
          type="text"
          name="email"
          placeholder="email address"
          value={this.state.createEmail}
          onChange={this.handleCreateChange}
          />
            <div style={{fontSize: 12, color: "red"}}> 
              {this.state.emailCreateError} 
            </div>
        </div>
        
        <div class="field">
          <input
          name="password"
          placeholder="temporary password"
          value={this.state.createPassword}
          onChange={this.handleCreateChange}
          type="password"
          />
            <div style={{fontSize: 12, color: "red"}}> 
              {this.state.passwordCreateError} 
            </div>
        </div>

        <div class="field">
          <input
          type="text"
          name="phone"
          placeholder="phone number"
          value={this.state.createPhone}
          onChange={this.handleCreateChange}
          />
            <div style={{fontSize: 12, color: "red"}}> 
              {this.state.phoneCreateError} 
            </div>
        </div>

        <div class="field">
          <input
          type="text"
          name="address"
          placeholder="address"
          value={this.state.createAddress}
          onChange={this.handleCreateChange}
          />
            <div style={{fontSize: 12, color: "red"}}> 
              {this.state.addressCreateError} 
            </div>
        </div>

        <div class="field">
          <label> User Privilege </label>
          <select class="ui fluid dropdown">
            <option value=""> Select </option>
            <option value="admin"> Administrator </option>
            <option value="user"> Regular User </option>
          </select>
        </div>

        <div class="field">
          <label> Department </label>
          <select class="ui fluid dropdown">
            <option value=""> Select </option>
            <option value="IT"> IT </option>
            <option value="HR"> HR </option>
          </select>
        </div>

        <button class="ui primary button" type="submit"> Save </button>
        <button class="ui button" type="cancel"> Cancel </button>
        <button class="ui red button" type="delete"> Delete </button>
    </div>
    </form>
    </Grid.Column>
      </Grid>
    )
  }
}

