import React from "react";

const MainView = () => {
    const logout = () => {
        localStorage.removeItem("login");
    }

    return (
        <form onSubmit={logout}>
            <button>Logout</button>
        </form>
    )
}

export default MainView;