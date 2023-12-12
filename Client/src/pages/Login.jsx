import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Divider,
  Button,
} from "@mantine/core";

import { GoogleButton } from "../components/buttons/GoogleButton";
import { FaceBookButton } from "../components/buttons/FacebookButton";
const Login = () => {
  const { loginUser, updateLoginInfo, loginError, isLoginLoading, loginInfo } =
    useContext(AuthContext);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
  return (
    <>
      <form onSubmit={form.onSubmit(loginUser)}>
        <Container size={420} my={40}>
          <Title
            ta="center"
            style={{
              fontFamily: "Greycliff CF, var(--mantine-font-family)",
              fontWeight: 900,
            }}
          >
            Welcome to Messenger!
          </Title>

          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Do not have an account yet?{" "}
            <Anchor href="/register" size="sm">
              Create account
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <Group grow mb="md" mt="md">
              <GoogleButton radius="xl">Google</GoogleButton>
              <FaceBookButton radius="xl">Facebook</FaceBookButton>
            </Group>
            <TextInput
              label="Email"
              placeholder="yourEmail@gmail.com"
              required
              onChange={(e) => {
                form.setFieldValue("email", e.currentTarget.value);
                updateLoginInfo({ ...loginInfo, email: e.target.value });
              }}
              error={form.errors.email && "Invalid email"}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              onChange={(e) => {
                form.setFieldValue("password", e.currentTarget.value);
                updateLoginInfo({ ...loginInfo, password: e.target.value });
              }}
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
            />
            {
              <Text
                c="red"
                size="sm"
                ta="center"
                style={{
                  opacity: loginError?.error ? 1 : 0,
                  transition: "opacity 0.3s ease", // Thêm hiệu ứng transition nếu muốn
                }}
              >
                An error occurred while logging in.
              </Text>
            }
            <Group justify="space-between" mt="lg">
              <Checkbox label="Remember me" />
              <Anchor size="sm">Forgot password?</Anchor>
            </Group>
            <Button type="submit" fullWidth mt="xl">
              {isLoginLoading ? "Loading..." : "Sign In"}
            </Button>
          </Paper>
        </Container>
      </form>

    </>
  );
};
export default Login;
