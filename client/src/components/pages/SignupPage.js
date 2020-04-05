import React, {Component, Fragment} from "react";
import {Link} from "react-router-dom";

class SignupPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorised: false,
            registered: false,
            email: '',
            password: '',
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReg = this.handleReg.bind(this);
        this.renderPage = this.renderPage.bind(this);
    }

    renderPage() {
        if (!this.state.registered) {
            return <Fragment>
                <Link to='/'>Main Page</Link>

                <h1>Registration</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Email:
                        <input
                            type="text"
                            name='email'
                            id="email"
                            value={this.state.email}
                            onChange={this.handleChange}/>
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name='password'
                            id="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </label>
                    <input
                        type="submit"
                        value="Reg"
                        onClick={this.handleReg}
                    />
                </form>
            </Fragment>
        } else if (this.state.registered) {
            return <Fragment>
                <h1>Спасибо за регистрацию</h1>
            </Fragment>
        }
    }

    handleReg(event) {
        try {
            const {email, password} = this.state;
            const body = {email, password};

            fetch('/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body, null, '\t'),
            })
                // .then(res => res.json())
                .then(res => {
                    if (res.status === 201) {
                        return this.setState({registered: true})
                    } else {
                        return null;
                    }
                })
                .catch(error => console.log('Error -> ', error))
        } catch (e) {
        }
    };


    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        })
    };

    handleSubmit(event) {
        event.preventDefault()
    };

    render() {
        return (
            <div>
                {this.renderPage()}
            </div>
        )
    }
}

export default SignupPage;
