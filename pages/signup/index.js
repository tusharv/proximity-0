import { useState } from 'react'
import Link from 'next/link'

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setMail] = useState('')
    const [password, setPass] = useState('')
    const [retypePassword, setPassAgain] = useState('')

    const submit = (e) => {
        e.preventDefault();

        if(name.length < 1) {
            alert('Name can not be blank!');
            return 0;
        }

        //Validation

        var requestOptions = {
            method: 'POST',
            headers: new Headers({"Content-Type": "application/json"}),
            body: JSON.stringify({name, email , password})
          };

        fetch("https://assign.leadwithcode.com/user", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }
    
    return (
        <>
            <div className="container">
                <form mothod="POST" onSubmit={submit}>
                    <h1>Sign Up</h1>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" name="name" id="name" placeholder="Enter name here" value={name} onChange={e => setName(e.target.value)} required></input>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" placeholder="Enter Email here" value={email} onChange={e => setMail(e.target.value)} required></input>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" id="password" placeholder="Enter Password here" value={password} onChange={e => setPass(e.target.value)}></input>
                    <label htmlFor="retypePassword">
                        Re-Type Password
                    </label>
                    <input type="password" name="retypePassword" id="retypePassword" placeholder="Retype Password here" value={retypePassword} onChange={e => setPassAgain(e.target.value)}></input>
                    <button className="btn">Sign Up</button>
                    <p>or</p>
                    <Link href="/login">
                        Login
                    </Link>
                </form>
            </div>
        </>
    )
}