import { useState } from "react"
import { useNavigate } from "react-router-dom";


function Login() {
    const [loginCred, setLoginCred] = useState<{ email: string, password: string }>({ email: "", password: "" })
    const navigate = useNavigate()

    const login = () => {
        fetch(import.meta.env.VITE_BACK_URL + '/login', {
            method: "POST",
            body: JSON.stringify(loginCred),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(json => {
            if (json.message && json.timestamp && json.status) {
                alert("An error occured: " + json.message)
                return
            }
            sessionStorage.setItem("token", json.id)
            navigate("/profile")
        })
    }
    return (<>
        <div>
            <label>Email</label><br />
            <input onChange={(e) => { setLoginCred({ ...loginCred, email: e.target.value }) }} type="text"></input><br />
            <label>Password</label><br />
            <input onChange={(e) => { setLoginCred({ ...loginCred, password: e.target.value }) }} type="password"></input><br />
            <button onClick={() => { login() }}>Log in</button>

        </div>
    </>)
}

export default Login