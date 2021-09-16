import React from 'react';

function Login ({ handleLogin }) {
    const [data, setData] = React.useState({
        email: '',
        password: '',
    })


    function handleSubmit(e){
        e.preventDefault();
        if (!data.email || !data.password){
            return;
        }
        const { email, password } = data;
        handleLogin({ email, password });
    }
    function handleChange(e) {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        });
    }

    return (
        <div className="auth">
            <form className="auth__form" onSubmit={handleSubmit}>
                    <h2 className="auth__title">Вход</h2>
                            <input className="auth__input" type="email" value={data.email}
                                   onChange={handleChange} name="email" id="email" placeholder="Email" required />
                            <input className="auth__input" type="password" value={data.password}
                                   onChange={handleChange} name="password" id="password" placeholder="Пароль" required />
                    <button type="submit" className="auth__save">Войти</button>
            </form>
        </div>
    )

}

export default Login;