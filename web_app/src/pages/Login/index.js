import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { RegisterLink } from '../Register'
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { PasswordForgetLink } from '../ForgetPassword'

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

const LoginPage = () => (
    <div>
        <h1>Login</h1>
        <LoginComponent />
        <RegisterLink />
        <PasswordForgetLink />
    </div>
);

class LoginComponentBase extends Component {
    state = {
        ...INITIAL_STATE
    }
    onSubmit = event => {
        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    }
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <button disabled={isInvalid} type="submit">
                    Sign In
                </button>
                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

const LoginComponent = compose(
    withRouter,
    withFirebase
)(LoginComponentBase);

export default LoginPage;
export { LoginComponent }