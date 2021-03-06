import { useEffect, useState, MouseEvent } from "react";
import Head from 'next/head'
import { useRouter } from 'next/router'


export default function Dashboard({ userData }) {
    const [username, setUserName] = useState("")
    const [userrole, setUserRole] = useState("")
    const [token, setAuthToken] = useState("")
    const [item, setItem] = useState("")
    const router = useRouter()

    interface UserList {
        id: string;
        name: string;
        email: string;
        role: string;
    }

    const logout = (e:MouseEvent)=> {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        router.push('/login/')
    }

    const submit = () => {
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
        if(userData) {
            setUserName(userData.name)
            setUserRole(userData.role)
            setAuthToken(localStorage.getItem('token'))
    
            console.log("useEffect");
            submit()
        } else {
            router.push('/login/')
        }
       
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
                    <button onClick={logout}>Logout</button>
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
                        {
                            item
                            ? [...item].map((i: any) => {
                            return <tr key={i.id} data-id={i.id}><td>{i.name}</td><td>{i.email}</td><td>{i.role}</td></tr>
                            })
                            :
                            <tr><td>Loading ...</td></tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}