import {Component} from "react";

const data = {
  login: 'user.@gmail.com',
  password: '1234567890',
  token: 'qwerty1234567890'
};

export default class AuthService extends Component {
  async login(user) {
    try {
      if (user.email === data.login && user.password === data.password) {
        return {status: 200, token: data.token};
      } else return {status: 400};
    }
    catch (e) {
      console.log('Error', e);
    }
  };
}