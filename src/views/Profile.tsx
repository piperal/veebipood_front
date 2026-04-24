import { useNavigate } from "react-router-dom";
import type { Person } from "../models/Person"
import { useState, useEffect } from "react"


function Profile() {
    const [person, setPerson] = useState<Person>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        personalCode: "",
        address: {
            number: "",
            street: "",
            city: "",
            country: "",
            zipcode: ""

        }
    })
    const navigate = useNavigate()


    useEffect(() => {
        if (sessionStorage.getItem("token") === null) {
            // window.location.href=""
            navigate("/login")
            return
        }
        fetch(import.meta.env.VITE_BACK_URL + '/profile?id=' + sessionStorage.getItem("token"))
            .then(res => res.json()).then(json => {
                if (json.message && json.timestamp && json.status) {
                    alert("An error has occured")
                    return;
                }
                setPerson(json)
            })

    }, []);

    const updateProfile = () => {
        fetch(import.meta.env.VITE_BACK_URL + '/profile', {
            method: "PUT",
            body: JSON.stringify(person),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(json => {
            if (json.message && json.timestamp && json.status) {
                alert("An error occured: " + json.message)
                return;
            }
            alert("Profile updated")
            sessionStorage.setItem("token", json.id)
        })
    }

    if (person.id === null) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div>
                <label>First name</label><br />
                <input value={person.firstName ?? ""} onChange={(e) => { setPerson({ ...person, firstName: e.target.value }) }} type="text"></input><br />
                <label>Last name</label><br />
                <input value={person.lastName ?? ""} onChange={(e) => { setPerson({ ...person, lastName: e.target.value }) }} type="text"></input><br />
                <label>Email</label><br />
                <input onChange={(e) => { setPerson({ ...person, email: e.target.value }) }} type="text"></input><br />
                <label>Password</label><br />
                <input onChange={(e) => { setPerson({ ...person, password: e.target.value }) }} type="password"></input><br />
                <label>Personal code</label><br />
                <input onChange={(e) => { setPerson({ ...person, personalCode: e.target.value }) }} type="number"></input><br />
                <h3>Address</h3><br />
                <label>Street</label><br />
                <input value={person.address?.street ?? ""} onChange={(e) => { setPerson({ ...person, address: { ...person.address, street: e.target.value } }) }}></input><br />
                <label>Street number</label><br />
                <input value={person.address?.number ?? ""} onChange={(e) => { setPerson({ ...person, address: { ...person.address, number: e.target.value } }) }}></input><br />
                <label>City</label><br />
                <input value={person.address?.city ?? ""} onChange={(e) => { setPerson({ ...person, address: { ...person.address, city: e.target.value } }) }}></input><br />
                <label>Country</label><br />
                <input value={person.address?.country ?? ""} onChange={(e) => { setPerson({ ...person, address: { ...person.address, country: e.target.value } }) }}></input><br />
                <label>Zip code</label><br />
                <input value={person.address?.zipcode ?? ""} onChange={(e) => { setPerson({ ...person, address: { ...person.address, zipcode: e.target.value } }) }}></input><br />
                <button onClick={() => { updateProfile() }}>Sign up</button>

            </div>
        </>
    )
}

export default Profile