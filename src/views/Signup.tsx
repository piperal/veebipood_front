import type { Person } from "../models/Person"
import { useState } from "react"


function Signup() {
    const [person, setPerson] = useState<Partial<Person>>({})

    const signup = () => {
        fetch(import.meta.env.VITE_BACK_URL + '/signup', {
            method: "POST",
            body: JSON.stringify(person),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(json => {
            if (json.message && json.timestamp && json.status) {
                alert("An error occured: " + json.message)
                return
            }
            alert("Signed up with id:" + json.id)
            sessionStorage.setItem("token", json.id)
        })
    }

    return (
        <>
            <div>
                <label>First name</label><br />
                <input onChange={(e) => { setPerson({ ...person, firstName: e.target.value }) }} type="text"></input><br />
                <label>Last name</label><br />
                <input onChange={(e) => { setPerson({ ...person, lastName: e.target.value }) }} type="text"></input><br />
                <label>Email</label><br />
                <input onChange={(e) => { setPerson({ ...person, email: e.target.value }) }} type="text"></input><br />
                <label>Password</label><br />
                <input onChange={(e) => { setPerson({ ...person, password: e.target.value }) }} type="password"></input><br />
                <label>Personal code</label><br />
                <input onChange={(e) => { setPerson({ ...person, personalCode: e.target.value }) }} type="number"></input><br />
                {/*<h3>Address</h3><br />
                <label>Street</label><br />
                <input onChange={(e)=>{setPerson({...person, address: {...person.address, street:e.target.value}})}}></input><br />
                <label>Street number</label><br />
                <input></input><br />
                <label>City</label><br />
                <input></input><br />
                <label>Country</label><br />
                <input></input><br />
                <label>Zip code</label><br />
                <input></input><br />*/}
                <button onClick={() => { signup() }}>Sign up</button>

            </div>
        </>
    )
}

export default Signup