import React from "react";
import { useRouter } from "next/router";
import { Wrapper } from "../components/Wrapper";
import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const Login: React.FC<{}> = ({}) => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await login({ options: values });
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* <Box p={2} m={2}>
              <InputField label="Email" placeholder="Email" name="email" />
            </Box> */}
            <Box p={2} m={2}>
              <InputField
                label="Username"
                placeholder="username"
                name="username"
              />
            </Box>
            <Box p={2} m={2}>
              <InputField
                label="Password"
                placeholder="password"
                name="password"
                type="password"
              />
            </Box>

            <Box m={2} p={2}>
              <Button
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
