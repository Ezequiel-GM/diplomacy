import { FormikValues, useFormik } from "formik";
import styled from "styled-components";
import { EMAIL_REG_EXP } from "../../constants";
import Card from "../Card";
import Heading1 from "../Heading1";
import LinkButton from "../LinkButton";
import TextButton from "../TextButton";
import TextField from "../TextField";

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
  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validate,
    validateOnBlur: false,
    onSubmit: (values) => console.log(values), // TODO replace with Firebase service call
  });

  return (
    <Card>
      <Heading1>Create an Account</Heading1>
      <form onSubmit={formik.handleSubmit} noValidate>
        <TextField
          id="displayName"
          name="displayName"
          label="Display Name"
          value={formik.values.displayName}
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
          error={
            formik.touched.password && formik.errors.password !== undefined
          }
          errorMessage={formik.errors.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TextButton width="100%" type="submit">
          Create Account
        </TextButton>
      </form>
      <BottomSection>
        <LinkButton onClick={props.onClickBack}>Back to Login</LinkButton>
      </BottomSection>
    </Card>
  );
}
