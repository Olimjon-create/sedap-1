// // pages/login.js
// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";

// import {
//   Avatar,
//   Button,
//   TextField,
//   FormControlLabel,
//   Checkbox,
//   Grid,
//   Alert,
//   Box,
//   Snackbar,
//   FormControl,
//   InputLabel,
//   OutlinedInput,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import AuthLayout from "../../components/AuthLayout";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState(router.query?.email ?? "");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   console.log("router", router);

//   async function handleSubmit(event) {
//     event.preventDefault();

//     const formData = new FormData(event.currentTarget); // { get: (attrName) => { return form[attrName] } }
//     const email = formData.get("email"); // 'test@mail.com'
//     const password = formData.get("password"); // 'errer3r3r3'

//     const response = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       const res = await response.json();
//       const { user, jwt } = res.body;
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("jwt", jwt);
//       router.push("/dashboard");
//     } else {
//       // console.log('res err', response.body.error)
//       // Handle errors
//     }
//   }

//   const [showPassword, setShowPassword] = React.useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const handleMouseUpPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <AuthLayout title="Tizimga kirish">
//       <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//         <LockOutlinedIcon />
//       </Avatar>

//       {error && (
//         <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
//           {error}
//         </Alert>
//       )}

//       <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//         <TextField
//           margin="normal"
//           required
//           fullWidth
//           id="email"
//           label="Email Manzil"
//           name="email"
//           autoComplete="email"
//           autoFocus
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <FormControl margin="normal" required fullWidth variant="outlined">
//           <InputLabel htmlFor="outlined-adornment-password">Parol</InputLabel>
//           <OutlinedInput
//             id="outlined-adornment-password"
//             name="password" // <-- kerakli joy
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             endAdornment={
//               <InputAdornment position="end">
//                 <IconButton
//                   aria-label={
//                     showPassword ? "hide the password" : "display the password"
//                   }
//                   onClick={handleClickShowPassword}
//                   onMouseDown={handleMouseDownPassword}
//                   onMouseUp={handleMouseUpPassword}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             }
//             label="Parol"
//           />
//         </FormControl>

//         <FormControlLabel
//           control={<Checkbox value="remember" color="primary" />}
//           label="Eslab qolish"
//         />

//         <Button
//           type="submit"
//           fullWidth
//           variant="contained"
//           sx={{ mt: 3, mb: 2 }}
//           disabled={loading}
//         >
//           {loading ? "Kirilmoqda..." : "Kirish"}
//         </Button>

//         <Grid container>
//           <Grid item xs>
//             <Link href="/forgot-password" passHref>
//               <Button variant="text" size="small">
//                 Parolni unutdingizmi?
//               </Button>
//             </Link>
//           </Grid>
//           <Grid item>
//             <Link href="/auth/register" passHref>
//               <Button variant="text" size="small">
//                 {"Hisobingiz yo'qmi? Ro'yxatdan o'tish"}
//               </Button>
//             </Link>
//           </Grid>
//         </Grid>
//       </Box>
//     </AuthLayout>
//   );
// }
// pages/login.js
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Alert,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthLayout from "../../components/AuthLayout";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState(router.query?.email ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.message || "Login jarayonida xatolik yuz berdi");
        setLoading(false);
        return;
      }

      const res = await response.json();
      const { user, jwt } = res.body;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("jwt", jwt);
      router.push("/dashboard");
    } catch (e) {
      setError("Tarmoqda xatolik yuz berdi");
      setLoading(false);
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <AuthLayout title="Tizimga kirish">
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>

      {error && (
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Manzil"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormControl margin="normal" required fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Parol</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "parolni yashirish" : "parolni ko‘rsatish"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Parol"
          />
        </FormControl>

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Eslab qolish"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? "Kirilmoqda..." : "Kirish"}
        </Button>

        <Grid container>
          <Grid item xs>
            <Link href="/forgot-password" passHref>
              <Button variant="text" size="small">
                Parolni unutdingizmi?
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/auth/register" passHref>
              <Button variant="text" size="small">
                Hisobingiz yo‘qmi? Ro'yxatdan o'tish
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
}
