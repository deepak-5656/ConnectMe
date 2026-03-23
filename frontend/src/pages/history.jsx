import React, { useContext, useEffect, useState } from "react";
import withAuth from '../utils/withAuth';
import { useNavigate } from "react-router-dom";
import "../App.css";
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { AuthContext } from '../contexts/AuthContext';

function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                let result = await getHistoryOfUser();
                setMeetings(result);
            } catch(err) {
                console.log(err);
            }
        }
        fetchHistory();
    }, []);

    return (
        <div>
            <div>
                <IconButton onClick={() => navigate("/home")}>
                    <HomeIcon />
                </IconButton>
            </div>

            {meetings.map((meeting, index) => (
                <div key={index} style={{
                    borderBottom: "1px solid #ccc",
                    padding: "10px"
                }}>
                    <p>Code: {meeting.meetingCode}</p>
                    <p>Date: {new Date(meeting.date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    )
}

export default withAuth(History);