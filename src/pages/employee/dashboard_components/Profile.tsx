import React from 'react';
import {useSelector} from "react-redux";
import LoggedInDuration from "../../../components/LoggedInDuration";

const Profile: React.FC = () => {
    const user = useSelector((state: any) => state.auth.user);
    const token = useSelector((state: any) => state.auth.token);

    return (
        <div>
            <h1>Profile</h1>

            <div className="title-container">
                <div>
                    <h1>Welcome, {user.firstName} {user.lastName}!</h1>
                    <p>Id: {user.id} </p>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                </div>
                <h2>Token:</h2>
                <p>${token}</p>
                <LoggedInDuration/>
            </div>
        </div>
    );
};

export default Profile;
