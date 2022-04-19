import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FormikValues, useFormik } from "formik";
import { useState } from "react";
import styled from "styled-components";
import Card from "../../components/Card";
import FormError from "../../components/FormError";
import Heading1 from "../../components/Heading1";
import LinkButton from "../../components/LinkButton";
import TextButton from "../../components/TextButton";
import TextField from "../../components/TextField";
import { EMAIL_REG_EXP } from "../../constants";
import { auth } from "../../firebase";

const BottomSection = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

const validate = async (values: FormikValues) => {
  const errors: { displayName?: string; email?: string; password?: string } =
    {};

  // Validate displayName
  if (!values.displayName) {
    errors.displayName = "Please enter a display name.";
  }

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
  onClickBack: () => void;
}
export default function RegisterCard(props: Props) {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState<string>();

  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validate,
    validateOnBlur: false,
    onSubmit: (values) =>
      createAccount(values.displayName, values.email, values.password),
  });

  const createAccount = async (
    displayName: string,
    email: string,
    password: string
  ): Promise<void> => {
    setIsCreatingAccount(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => updateProfile(user, { displayName: displayName }))
      .catch(handleCreateAccountError);
  };

  const handleCreateAccountError = (error: FirebaseError) => {
    setIsCreatingAccount(false);

    console.log(error);

    switch (error.code) {
      case "auth/email-already-in-use":
        setError("An account with that email already exists.");
        break;
      case "auth/invalid-email":
        setError("Invalid email address.");
        break;
      case "auth/weak-password":
        setError("Password must be at least 6 characters.");
        break;
      default:
        setError("Account creation failed.");
    }
  };

  return (
    <Card width={240}>
      <Heading1>Create an Account</Heading1>
      <form onSubmit={formik.handleSubmit} noValidate>
        <TextField
          id="displayName"
          name="displayName"
          label="Display Name"
          value={formik.values.displayName}
          disabled={isCreatingAccount}
          error={
            formik.touched.displayName &&
            formik.errors.displayName !== undefined
          }
          errorMessage={formik.errors.displayName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          disabled={isCreatingAccount}
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
          disabled={isCreatingAccount}
          error={
            formik.touched.password && formik.errors.password !== undefined
          }
          errorMessage={formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {error && <FormError>{error}</FormError>}
        <TextButton width="100%" type="submit" disabled={isCreatingAccount}>
          Create Account
        </TextButton>
      </form>
      <BottomSection>
        <LinkButton onClick={props.onClickBack}>Back to Login</LinkButton>
      </BottomSection>
    </Card>
  );
}
