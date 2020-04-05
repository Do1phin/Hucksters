import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";

function AuthPage(props) {
    const [registered, setRegistered] = useState(false);
    const [authorised, setAuthorised] = useState(false);
    const [error, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let info;
        if (props.location.pathname === '/signup') {
            info = {
                title: 'Registration',
                btnName: 'Reg',
                urlPath: '/signup',
            }
        } else {
            info = {
                title: 'Authorisation',
                btnName: 'Sign',
                urlPath: '/signin',
            }
        }


    const renderPage = (action) => {

        if (!registered && !error && !authorised) {
            return <Fragment>
                <Link to='/'>Main Page</Link>

                <h1>{info.title}</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label>
                        Email:
                        <input
                            type="text"
                            name='email'
                            id="email"
                            value={email}
                            onChange={(e) => handleChange(e.target)}/>
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name='password'
                            id="password"
                            value={password}
                            onChange={(e) => handleChange(e.target)}
                        />
                    </label>
                    <input
                        type="submit"
                        value={info.btnName}
                        onClick={(e) => handleAction(action)}
                    />

                </form>
            </Fragment>
        } else if (registered && !error) {

            return <Fragment>
                <h1>Спасибо за регистрацию</h1>
            </Fragment>
        } else if (authorised && !error) {
            return <Fragment>
                <h1>Вы успешно авторизованы</h1>
            </Fragment>
        } else if (error) {
            return <Fragment>
                <h1>Ошибка введённых данных</h1>
            </Fragment>
        }
    };

    const handleAction = (action) => {
        try {
            const body = {email, password};

            fetch(info.urlPath, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body, null, '\t'),
            })
                // .then(res => res.json())
                .then(res => {
                    if (props.location.pathname === '/signup') {
                        if (res.status === 200) {
                            setRegistered(true);
                            return setError(false)
                        } else {
                            return setError(true);
                        }
                    } else {
                        if (res.status === 200) {
                            setAuthorised(true);
                            return setError(false)
                        } else {
                            return setError(true);
                        }
                    }
                })
                .catch(error => console.log('Error -> ', error))
        } catch (e) {
        }
    };


    const handleChange = (props) => {
        if (props.name === 'email') {
            setEmail(props.value)
        } else if (props.name === 'password') {
            setPassword(props.value)
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
    };

    return (
        <div>
            {renderPage()}
        </div>
    )

}

export default AuthPage;
