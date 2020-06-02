import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {login} from '../../components/admin/_api-vk';

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
            btnName: 'Sign UP',
            urlPath: '/signup',
        };
    } else {
        info = {
            title: 'Authorisation',
            btnName: 'Sign IN',
            urlPath: '/signin',
        };
    }


    const renderPage = (action) => {

        if (!registered && !error && !authorised) {
            return <Fragment>
                <br/>
                <div className="jumbotron">
                    <h1>{info.title}</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>

                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => handleChange(e.target)}
                            />
                            <br/>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => handleChange(e.target)}
                            />
                            <br/>
                            <button
                                className="btn btn-info"
                                type="submit button"
                                value={info.btnName}
                                onClick={(e) => handleAction(action)}
                            >
                                {info.btnName}
                            </button>
                            <button
                                onClick={login}
                            >
                                Войти через VK
                            </button>

                        </div>
                        <br/>
                        <p>OR</p>

                        <Link to='/signup' type='button' className='btn btn-link'>CREATE ACCOUNT</Link>

                    </form>
                </div>
            </Fragment>;
        } else if (registered && !error) {
            return <Fragment><br/>
                <div className="card border-success mb-3">
                    <div className="card-header">Поздравляем</div>
                    <div className="card-body">
                        <h4 className="card-title">Вы успешно зарегистрированы!</h4>
                        <p className="card-text">
                            В течении 3 секунды произойдёт перенаправление на страницу авторизации.
                            Если этого не произошло нажмите пожалуйста <Link to='/signin'>сюда</Link>
                        </p>
                    </div>
                </div>
            </Fragment>;
        } else if (authorised && !error) {
            return <Fragment><br/>
                <div className="card border-info mb-3">
                    <div className="card-header">Поздравляем</div>
                    <div className="card-body">
                        <h4 className="card-title">Вы успешно авторизованы!</h4>
                        <p className="card-text">
                            В течении 3 секунды произойдёт перенаправление на главную страницу сайта.
                            Если этого не произошло нажмите пожалуйста <Link to='/'>сюда</Link>
                        </p>
                    </div>
                </div>
            </Fragment>;
        } else if (error) {
            return <Fragment><br/>
                <div className="card border-danger mb-3">
                    <div className="card-header">Ошибка</div>
                    <div className="card-body">
                        <h4 className="card-title">Ошибка введённых данных!</h4>
                        <p className="card-text">
                            В течении 3 секунды произойдёт перенаправление на главную страницу сайта.
                            Если этого не произошло нажмите пожалуйста <Link to='/'>сюда</Link>
                        </p>
                    </div>
                </div>
            </Fragment>;
        }
    };

    const handleAction = (action) => {
        try {
            const body = {email, password};

            fetch(info.urlPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body, null, '\t'),
            })
                // .then(res => res.json())
                .then(res => {
                    if (props.location.pathname === '/signup') {
                        if (res.status === 200) {
                            setRegistered(true);
                            return setError(false);
                        } else {
                            return setError(true);
                        }
                    } else {
                        if (res.status === 200) {
                            setAuthorised(true);
                            return setError(false);
                        } else {
                            return setError(true);
                        }
                    }
                })
                .catch(error => console.log('Error -> ', error));
        } catch (e) {
            throw new Error(e);
        }
    };


    const handleChange = (props) => {
        if (props.name === 'email') {
            setEmail(props.value);
        } else if (props.name === 'password') {
            setPassword(props.value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            {renderPage()}
        </div>
    );

}

export default AuthPage;
