import { useEffect, useState } from "react";
import Head from 'next/head'


export default function Dashboard({ userData }) {
    const [username, setUserName] = useState("")
    const [userrole, setUserRole] = useState("")
    const [token, setAuthToken] = useState("")
    const [item, setItem] = useState("")

    const submit = (e) => {
        console.log(item);
        // Hack to aviod multiple calls
        if (item) {
            return;
        }

        var requestOptions = {
            method: 'GET',
            headers: new Headers({
                "auth": token
            })
        };

        fetch("https://assign.leadwithcode.com/user", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log("result is ", result);
                setItem(JSON.parse(result))
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        setUserName(userData.name)
        setUserRole(userData.role)
        setAuthToken(localStorage.getItem('token'))

        console.log("useEffect");
        submit()
    })

    return (
        <>
            <Head>
                <title>{username} - Dashboard</title>
            </Head>
            <div className="dashboard-head">
                <span>
                    Hello {username}, {userrole}
                </span>
                <span>
                    <button>Change Password</button>
                    <button>Logout</button>
                </span>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {item.map((i) => {
                            return <tr key={i.id} data-id={i.id}><td>{i.name}</td><td>{i.email}</td><td>{i.role}</td></tr>
                        })} */}
                    </tbody>
                </table>
            </div>
        </>
    )
}