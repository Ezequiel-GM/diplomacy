import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FormikValues, useFormik } from "formik";
import { useState } from "react";
import { EMAIL_REG_EXP } from "../../constants";
import { auth } from "../../firebase";
import Card from "../Card";
import FormError from "../FormError";
import Heading1 from "../Heading1";
import TextButton from "../TextButton";
import TextField from "../TextField";

const validate = (values: FormikValues) => {
  const errors: { email?: string; password?: string } = {};

  // Validate email
  if (!values.email) {
    errors.email = "Please enter your email address.";
  } else if (!RegExp(EMAIL_REG_EXP).test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Validate password
  if (!values.password) {
    errors.password = "Please enter your password.";
  }

  return errors;
};

interface Props {
  onChangeSigningIn: (signingIn: boolean) => void;
}
export default function LoginCard(props: Props) {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    validateOnBlur: false,
    onSubmit: (values) => signIn(values.email, values.password),
  });

  const signIn = (email: string, password: string): void => {
    setIsSigningIn(true);
    props.onChangeSigningIn(true);

    signInWithEmailAndPassword(auth, email, password).catch(handleSignInError);
  };

  const handleSignInError = (error: FirebaseError) => {
    setIsSigningIn(false);
    props.onChangeSigningIn(false);

    switch (error.code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        setError("Incorrect email or password.");
        break;
      case "auth/too-many-requests":
        setError("Too many attempts. Wait a few minutes and try again.");
        break;
      default:
        setError("Login failed.");
    }
  };

  return (
    <Card width={240}>
      <Heading1>Sign In</Heading1>
      <form onSubmit={formik.handleSubmit} noValidate>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          disabled={isSigningIn}
          error={formik.touched.email && formik.errors.email !== undefined}
          errorMessage={formik.errors.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          disabled={isSigningIn}
          error={
            formik.touched.password && formik.errors.password !== undefined
          }
          errorMessage={formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {error && <FormError>{error}</FormError>}
        <TextButton width="100%" type="submit" disabled={isSigningIn}>
          Log In
        </TextButton>
      </form>
    </Card>
  );
}
