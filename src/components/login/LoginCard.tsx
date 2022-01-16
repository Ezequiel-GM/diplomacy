import { FormikValues, useFormik } from "formik";
import { EMAIL_REG_EXP } from "../../constants";
import Card from "../Card";
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

export default function LoginCard() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    validateOnBlur: false,
    onSubmit: (values) => console.log(values),
  });

  return (
    <Card>
      <Heading1>Sign In</Heading1>
      <form onSubmit={formik.handleSubmit} noValidate>
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
          Log In
        </TextButton>
      </form>
    </Card>
  );
}
