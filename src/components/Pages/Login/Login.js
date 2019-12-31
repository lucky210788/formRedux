import React, {Component} from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import './Login.scss';
import AuthService from '../../../services/authService';
import Modal from './Modal/Modal';
import Cookies from 'universal-cookie';

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
      formControls: {
        email: {
          value: '',
          type: 'email',
          placeholder: 'Email address',
          errorMessage: 'Enter a valid email',
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true
          }
        },
        password: {
          value: '',
          type: 'password',
          placeholder: 'Password',
          errorMessage: 'Minimum length 9 characters',
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 9
          }
        }
      },
      modalIsOpen: false
    };
  }

  authService = new AuthService();

  submitHeandler = (event) => {
    event.preventDefault();
  };

  loginHandler = () => {
    const user = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
    };

    this.authService.login(user)
      .then((response) => {
        if (response) {
          if (response.status === 200) {
            cookies.set('token', response.token, {path: '/'});
            this.props.onLogIn();
          } else {
            this.setState({
              modalIsOpen: !this.state.modalIsOpen
            });
          }
        }
      })
      .catch((e) => {
        console.log('Error', e);
      })
  };


  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    });

    this.setState({
      formControls,
      isFormValid
    })
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          disabled={this.state.isFormValid}
          placeholder={control.placeholder}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
      )
    })
  }

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  };

  render() {
    return (
      <div>
        <form className="login-form"
              onSubmit={this.submitHeandler}>
          <h1 className="login-form-title">Enter login and password</h1>
          {this.renderInputs()}
          <Button
            disabled={!this.state.isFormValid}
            className={'btn-main'}
            onClick={this.loginHandler}
          >login
          </Button>
        </form>
        <Modal show={this.state.modalIsOpen}
               onClose={this.toggleModal}>
          <p>Wrong login or password</p>
        </Modal>
      </div>
    );
  }
}

export default Login;