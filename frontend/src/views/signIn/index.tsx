import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { FormikHelpers } from "formik";

import { TextFieldUi, ButtonUi, UseForm, Snackbars } from "../../components";

import { initialFValuesTypes } from "../../types/initialFValues";
import { initialValuesSignIn } from "../../initialValues";
import { SignInSchema } from "../../schemas/signInSchema";

import { UsersRequest } from "../../services/usersService";


import { useHistory } from "react-router-dom";

import { useDispatch } from 'react-redux'

import { Auth_Success } from "../../store/actions/auth.actions";


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Derechos reservados
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export function SignIn() {
    const [severity, setSeverity] = React.useState("success");
    const [disablebtn, setdisablebtn] = React.useState(false);
    const [msg, setMsg] = React.useState("success");
    const [openn, setOpenn] = React.useState(false);

    let history = useHistory();
    const dispatch = useDispatch()

    const handleCloses = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenn(false);
    };

    const handleClick = () => {
        setOpenn(true);
    };


    const onSubmit = async (values: initialFValuesTypes, formikHelpers: FormikHelpers<any>) => {
        //history.push('/dashboard')
        setdisablebtn(true)

        try {
            const res = await UsersRequest.login({ email: values.email_signin, password: values.password_signin })

            if (res.success) {
                handleClick()
                setdisablebtn(false)
                dispatch(Auth_Success(true))
                history.push('/dashboard')
            } else {
                handleClick()
                setMsg(res.error)
                setSeverity('error')
                dispatch(Auth_Success(false))
                setdisablebtn(false)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const formik = UseForm(initialValuesSignIn, SignInSchema, onSubmit)


    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>

                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextFieldUi
                                    autofocus={true}
                                    error={formik.errors.email_signin}
                                    label="Correo *"
                                    name="email_signin"
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.email_signin}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextFieldUi
                                    autofocus={false}
                                    error={formik.errors.password_signin}
                                    label="Contraseña *"
                                    name="password_signin"
                                    onChange={formik.handleChange}
                                    type="password"
                                    value={formik.values.password_signin}
                                />




                            </Grid>

                            <Grid item xs={12}>

                                <ButtonUi fullWidth={true} disabled={disablebtn} text="Enviar" type="submit" variant="contained" />

                            </Grid>




                        </Grid>

                        <Snackbars
                            msg={msg}
                            open={openn}
                            severity={severity}
                            handleClose={handleCloses}
                        />


                        
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );

}
