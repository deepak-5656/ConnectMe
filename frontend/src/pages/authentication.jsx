import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { formToJSON } from 'axios';
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Authentication(){


const [username, setUsername] = React.useState("");
const [password, setPassword] = React.useState("");
const [name, setName] = React.useState("");
const [message, setMessage] = React.useState("");
const [error,setError] = React.useState("");


  const [formState, setFormState] = React.useState(0);
  const [type, setType] = React.useState("success");
  const [open, setOpen] = React.useState(false);

  
  const {handleRegister,handleLogin} = React.useContext(AuthContext);

  let handleAuth = async()=>{
    try{
      if(formState===0){

        let result = await handleLogin(username,password);
        

      }
      if(formState===1){
        let  result =await handleRegister(name,username,password);
        console.log(result);
        setUsername("");
        setMessage(result);
        setType("success");
        setOpen(true);
         setError("");
        setFormState(0);
        setPassword("");
      }

    }catch(err){
  
        let msg = err.response?.data?.message || "Something went wrong";
        setMessage(msg);
        setError(msg);
        setType("error");
        
       
  }
  }
  
  return (
    <>
      <CssBaseline />

      <div className="container">

        {/* LEFT SIDE IMAGE */}
        <div className="left"></div>

        {/* RIGHT SIDE FORM */}
        <div className="right">
          <Box className="formBox">
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', mx: 'auto' }}>

              <LockOutlinedIcon />
            </Avatar>


            {/* <Typography variant="h5" align="center">
              Sign in
            </Typography> */}
            <div variant="h5" align="center">
              <Button variant={formState===0?"contained":""} onClick={()=>{setFormState(0)}}>
                SIGN IN
              </Button>
              <Button variant={formState===1?"contained":""} onClick={()=>{setFormState(1)}}>
                SIGN UP
              </Button>
            </div>

            <Box sx={{ mt: 3 }}>
              
              {formState===1?  <TextField fullWidth margin="normal" id="username" label="Full Name*" value={name} onChange={(e)=>setName(e.target.value)} />:<></> }
              <TextField fullWidth margin="normal" id="username" label="Username*" value={username} onChange={(e)=>setUsername(e.target.value)} />
              <TextField fullWidth margin="normal" label="Password*" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />


              {/* <FormControlLabel control={<Checkbox />} label="Remember me" /> */}

              <p style={{color:"red"}}>{error}</p>
              <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick ={handleAuth}>
                {formState===0? "Login" : "Register"}
              </Button>

              {/* <div className="links">
                <a href="#">Forgot password?</a>
                <a href="#">Sign Up</a>
              </div> */}
            </Box>
          </Box>
        </div>

      </div>

      {/* 🔥 CSS (IMPORTANT) */}
      <style>{`
        .container {
          display: flex;
          height: 100vh;
        }

        .left {
          width: 60%;
          background-image: url("/backimage.png");
          background-size: cover;
          background-position: center;
        }

        .right {
          width: 40%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: white;
        }

        .formBox {
          width: 70%;
        }

        .links {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        /* 🔥 MOBILE RESPONSIVE */
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }

          .left {
            display: none;
          }

          .right {
            width: 100%;
          }

          .formBox {
            width: 85%;
          }
        }
      `}</style>

        
        <Snackbar
  open={open}
  autoHideDuration={4000}
  onClose={() => setOpen(false)}
  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
>
  <Alert severity={type} variant="filled">
    {message}
  </Alert>
</Snackbar>
    </>
  );
}



