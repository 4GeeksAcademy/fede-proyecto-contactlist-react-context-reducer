import { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { Link } from "react-router-dom"


export const ContactsList = () => {

    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {
        refreshContacts();
    }, [])

    async function refreshContacts() {
        let response = await fetch("https://playground.4geeks.com/contact/agendas/Fede/contacts")
        if (!response.ok) {
            console.error(response.status, response.statusText)
            return { ...store, contacts: action.payload.contacts }
        }
        let data = await response.json();
        dispatch({ type: "load_contact", payload: { contacts: data.contacts } });
    }

    return (
        <div>
            <h1 className="text-center">lista de contactos</h1>
            <div className="d-flex justify-content-end mx-3">
                <Link to="/">
                    <button className="btn btn-success">Add new contact</button>
                </Link>
            </div>
            {store.contacts?.map((contact) => (
                <div className="m-3 d-flex border">
                    <img src="" alt="foto" />
                    <ul key={contact.id} className="">
                        <li><strong>Nombre:</strong> {contact.name}</li>
                        <li><strong>Telefono:</strong> {contact.phone}</li>
                        <li><strong>Email:</strong> {contact.email}</li>
                        <li><strong>Direccion:</strong> {contact.address}</li>
                    </ul>
                    <div className="ms-auto m-2">
                        <button className="btn btn-success m-1"> editar</button>
                        <button className="btn btn-danger m-1"> eliminar</button>
                    </div>
                </div>
            )) || "cargando"}
        </div>
    )
}