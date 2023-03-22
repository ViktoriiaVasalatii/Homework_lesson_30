import React, {Component} from 'react';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
      formSubmitted: false,
      formErrors: {},
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      this.setState({formSubmitted: true});
      console.log('Вас було успішно зареєстровано');
    } else {
      console.error('Щось пішло не так');
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value})
  }

  handleFocus = () => {
    const formErrors = {...this.state.formErrors};
    this.setState({formErrors})
  }

  handleBlur = (event) => {
    const { name, value } = event.target;
    const formErrors = { ...this.state.formErrors };
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 2 ? "Імʼя не може бути менше 2 символів" : "";
        break;
      case "email":
        formErrors.email =
          value.length === 0
            ? "Email є обовʼязковим"
            : !this.validateEmail(value)
            ? "Невірний формат поштової адреси"
            : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors });
  };
  

validateForm = () => {
  const formErrors = {};
  let isValid = true;
  const { firstName, email, password, confirmPassword } = this.state;
  if (firstName.length < 2) {
    formErrors.firstName = "Імʼя не може бути менше 2 символів";
    isValid = false;
  }
  if (email.length === 0) {
    formErrors.email = "Email є обовʼязковим";
    isValid = false;
  } else if (!this.validateEmail(email)) {
    formErrors.email = "Невірний формат поштової адреси";
    isValid = false;
  }
  if (password.length === 0) {
    formErrors.password = "Пароль є обовʼязковим";
    isValid = false;
  }
  if (confirmPassword !== password) {
    formErrors.confirmPassword = "Паролі не співпадають";
    isValid = false;
  }
  this.setState({ formErrors });
  return isValid;
};

validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


  render() {
    const { firstName, email, password, confirmPassword, formErrors, formSubmitted } = this.state;
    const styleForm = {
      display: 'flex',
      justifyContent: 'flex-start',
      margin: '25px 25px',
      padding: '15px',
      border: '1px solid lightgreen',
      borderRadius: '5px',
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={styleForm}>
          <div>
            <label htmlFor="">First name:</label>
            <input
              type="text"
              placeholder={'Some'}
              value={firstName}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {formErrors.firstName && <span>{formErrors.firstName}</span>}
          </div>
          <div>
            <label htmlFor="">Email: </label>
            <input
              type="text"
              placeholder={'Some'}
              value={email}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {formErrors.email && <span>{formErrors.email}</span>}
          </div>
          <div>
            <label htmlFor="">Pass:</label>
            <input
              type="text"
              placeholder={'Some'}
              value={password}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {formErrors.password && <span>{formErrors.password}</span>}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm password: </label>
            <input
              type="text"
              placeholder={'Some'}
              value={confirmPassword}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
            {formErrors.confirmPassword && <span>{formErrors.confirmPassword}</span>}
          </div>
          <button type='submit'>
            Реєструватись
          </button>
          {formSubmitted && <p>Вас було успішно зареєстровано</p>}
        </form>
      </div>
    );
  }
}


export default Form;
