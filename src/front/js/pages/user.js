import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export default function Private() {
    const { store, actions } =useContext(Context);


    useEffect(() =>{
        actions.fetchUser();
        console.log(store.user)
    }, []);
    return (
        <div>
            {store.user ? <div>{store.user.email}</div>:<div>please sing in </div>}
            <h1>Hello world</h1>
        </div>
    )
}

