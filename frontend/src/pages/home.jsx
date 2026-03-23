import React, { useState, useContext } from "react";
import withAuth from '../utils/withAuth';
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    }

    return (
        <div className="homeContainer">
            {/* NAVBAR */}
            <div className="navBar">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h3>ConnectMe</h3>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => navigate("/history")} style={{color:"white"}}>
    <RestoreIcon />
</IconButton>
<p style={{color:"white", cursor:"pointer"}} onClick={() => navigate("/history")}>History</p>
<Button onClick={() => {
    localStorage.removeItem("token");
    navigate("/auth");
}} style={{color:"#f87171", fontWeight:"bold"}}>Logout</Button>
                </div>
            </div>

            {/* MAIN */}
            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2 style={{gap:"2rem"}}>Providing Quality Video Call Just Like Quality Education</h2>

                        <div className="joinBox">
                            <TextField
                             onChange={e => setMeetingCode(e.target.value)}
                                id="outlined-basic"
                                label="Meeting Code"
                                variant="outlined"
                                value={meetingCode}
                                 sx={{
                                "& .MuiOutlinedInput-root":{
                                color:"white",
                                background:"rgba(255,255,255,0.1)",
                                "& fieldset":{borderColor:"rgba(255,255,255,0.5)"},
                                 "&:hover fieldset":{borderColor:"white"},
                                    },
                                "& .MuiInputLabel-root":{color:"rgba(255,255,255,0.7)"},
                                 "& .MuiInputLabel-root.Mui-focused":{color:"white"},
                                 minWidth:"200px"
                                    }}
/>
                            <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
                        </div>
                    </div>
                </div>
                <div className='rightPanel'>
                    <img src='/logo3.png' alt="" style={{background:"transparent"}} />
                </div>
            </div>
        </div>
    )
}

export default withAuth(HomeComponent);