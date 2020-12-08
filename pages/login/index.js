import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Login() {
    const [email, setMail] = useState('')
    const [password, setPass] = useState('')
    const router = useRouter()

    const validate = () => {

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if(email.length < 1) {
            alert("Please enter Email Address!")
            return false;
        } else if(!pattern.test(email)) {
            alert("Please enter valid Email Address!")
            return false;
        } else if(password.length < 1) {
            alert("Password can not be blank!")
            return false;
        }
        
        return true;
    }

    const setupLogin = ({token, user}) => {
        if(token) {
            localStorage.setItem("token", token);
        }

        if(user) {
            localStorage.setItem("user", JSON.stringify(user));
        }

        router.push('/dashboard/')

    }

    const submit = (e) => {
        e.preventDefault();

        if (validate()) {
            var requestOptions = {
                method: 'POST',
                headers: new Headers({ "Content-Type": "application/json" }),
                body: JSON.stringify({ email, password })
            };

            fetch("https://assign.leadwithcode.com/auth/login", requestOptions)
                .then(response => response.text())
                .then(result => {
                    if(result === "Password does not match" || result === "No such combination of email and password") {
                        alert(result);
                        return;
                    }

                    const data = JSON.parse(result)
                    if(data.message === 'Successful login') {
                        setupLogin(data);
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    return (
        <>
            <div className="container">
                <form mothod="POST" onSubmit={submit}>
                    <h1>Login</h1>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" placeholder="Enter Email here" value={email} onChange={e => setMail(e.target.value)} required></input>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" id="password" placeholder="Enter Password here" value={password} onChange={e => setPass(e.target.value)} required></input>
                    <button className="btn">Login</button>
                    <p>or</p>
                    <Link href="/signup">
                        Create Account
                    </Link>
                </form>
            </div>
        </>
    )
}