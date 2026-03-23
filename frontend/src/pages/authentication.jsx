import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Authentication(){

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [error, setError] = React.useState("");
    const [formState, setFormState] = React.useState(0);
    const [type, setType] = React.useState("success");
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const {handleRegister, handleLogin} = React.useContext(AuthContext);

    let handleAuth = async() => {
        if(loading) return;
        setLoading(true);
        try {
            if(formState === 0){
                await handleLogin(username, password);
            }
            if(formState === 1){
                let result = await handleRegister(name, username, password);
                setUsername("");
                setMessage(result);
                setType("success");
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
            }
        } catch(err) {
            let msg = err.response?.data?.message || "Something went wrong";
            setMessage(msg);
            setError(msg);
            setType("error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <CssBaseline />
            <div style={{
                display:"flex",
                height:"100vh",
                fontFamily:"Segoe UI, sans-serif"
            }}>
                {/* LEFT IMAGE */}
                <div style={{
                    width:"60%",
                    backgroundImage:'url("/backimage.png")',
                    backgroundSize:"cover",
                    backgroundPosition:"center"
                }} className="authLeft"></div>

                {/* RIGHT FORM */}
                <div style={{
                    width:"40%",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    background:"#f8f9ff"
                }} className="authRight">
                    <div style={{width:"75%"}}>
                        
                        {/* LOGO */}
                        <div style={{textAlign:"center", marginBottom:"24px"}}>
                            <Avatar sx={{
                                m:"auto",
                                mb:2,
                                bgcolor:"#4f46e5",
                                width:56,
                                height:56
                            }}>
                                <LockOutlinedIcon style={{fontSize:"1.8rem"}}/>
                            </Avatar>
                            <h2 style={{
                                margin:0,
                                fontSize:"1.6rem",
                                fontWeight:"700",
                                color:"#1e1e2e"
                            }}>
                                {formState===0 ? "Welcome Back" : "Create Account"}
                            </h2>
                            <p style={{
                                color:"#6b7280",
                                marginTop:"6px",
                                fontSize:"0.95rem"
                            }}>
                                {formState===0 ? "Sign in to ConnectMe" : "Join ConnectMe today"}
                            </p>
                        </div>

                        {  /* TABS */} 
                        <div style={{
                            display:"flex",
                            background:"#e5e7eb",
                            borderRadius:"10px",
                            padding:"4px",
                            marginBottom:"24px"
                        }}>
                            <button
                                onClick={()=>setFormState(0)}
                                style={{
                                    flex:1,
                                    padding:"10px",
                                    border:"none",
                                    borderRadius:"8px",
                                    cursor:"pointer",
                                    fontWeight:"600",
                                    fontSize:"0.95rem",
                                    background: formState===0 ? "white" : "transparent",
                                    color: formState===0 ? "#4f46e5" : "#6b7280",
                                    boxShadow: formState===0 ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                                    transition:"all 0.2s"
                                }}
                            >Sign In</button>
                            <button
                                onClick={()=>setFormState(1)}
                                style={{
                                    flex:1,
                                    padding:"10px",
                                    border:"none",
                                    borderRadius:"8px",
                                    cursor:"pointer",
                                    fontWeight:"600",
                                    fontSize:"0.95rem",
                                    background: formState===1 ? "white" : "transparent",
                                    color: formState===1 ? "#4f46e5" : "#6b7280",
                                    boxShadow: formState===1 ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                                    transition:"all 0.2s"
                                }}
                            >Sign Up</button>
                        </div>

                        {/* FIELDS */}
                        {formState===1 &&
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Full Name"
                                value={name}
                                onChange={e=>setName(e.target.value)}
                                sx={{mb:1}}
                            />
                        }
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Username"
                            value={username}
                            onChange={e=>setUsername(e.target.value)}
                            sx={{mb:1}}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            sx={{mb:1}}
                        />

                        {error && <p style={{color:"#ef4444", fontSize:"0.9rem", margin:"8px 0"}}>{error}</p>}

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleAuth}
                            disabled={loading}
                            style={{
                                background:"#4f46e5",
                                padding:"12px",
                                fontSize:"1rem",
                                fontWeight:"700",
                                borderRadius:"10px",
                                textTransform:"none",
                                marginTop:"16px",
                                boxShadow:"0 4px 12px rgba(79,70,229,0.3)"
                            }}
                        >
                            {loading ? "Please wait..." : (formState===0 ? "Login" : "Register")}
                        </Button>
                    </div>
                </div>
            </div>

            {/* MOBILE */}
            <style>{`
                @media (max-width: 768px) {
                    .authLeft { display: none !important; }
                    .authRight { width: 100% !important; background: #f8f9ff !important; }
                }
            `}</style>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical:"bottom", horizontal:"left" }}
            >
                <Alert severity={type} variant="filled">{message}</Alert>
            </Snackbar>
        </>
    );
}