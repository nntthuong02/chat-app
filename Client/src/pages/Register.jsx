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
  Button,
  NativeSelect,
} from "@mantine/core";
const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    isRegisterLoading,
    registerError,
  } = useContext(AuthContext);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      name: "",
      gender: "",
      checkbox: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      name: (val) => (val.trim() !== "" ? null : "Name cannot be empty"),
      gender: (val) => (val !== "" ? null : "Please select a gender"),
      numberPhone: (val) =>
        /^\d+$/.test(val) ? null : "Number Phone should contain only digits",
    },
  });
  return (
    <>
      <form onSubmit={form.onSubmit(registerUser)}>
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
            Already have an account?{" "}
            <Anchor href="/login" size="sm">
              Login
            </Anchor>
          </Text>

          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="email"
              placeholder="yourEmail@gmail.com"
              required
              onChange={(e) => {
                form.setFieldValue("email", e.currentTarget.value);
                updateRegisterInfo({ ...registerInfo, email: e.target.value });
              }}
              error={form.errors.email && "Invalid email"}
            />
            <Group justify="space-between">
              <TextInput
                label="Name"
                placeholder="Your name"
                required
                onChange={(e) => {
                  form.setFieldValue("name", e.currentTarget.value);
                  updateRegisterInfo({ ...registerInfo, name: e.target.value });
                }}
                error={form.errors.email && "Invalid email"}
              />
              <NativeSelect
                required
                label="Gender"
                placeholder="Gender"
                data={["", "Male", "Female", "Other"]}
                onChange={(e) => {
                  form.setFieldValue("gender", e.currentTarget.value);
                  updateRegisterInfo({
                    ...registerInfo,
                    gender: e.currentTarget.value,
                  });
                }}
              />
            </Group>

            <TextInput
              label="Number Phone"
              placeholder="Ex: 0395797020"
              required
              onChange={(e) => {
                form.setFieldValue("numberPhone", e.currentTarget.value);
                updateRegisterInfo({
                  ...registerInfo,
                  numberPhone: e.target.value,
                });
              }}
              error={form.errors.email && "Incorrect "}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              onChange={(e) => {
                form.setFieldValue("password", e.currentTarget.value);
                updateRegisterInfo({
                  ...registerInfo,
                  password: e.target.value,
                });
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
                  opacity: registerError?.error ? 1 : 0,
                  transition: "opacity 0.3s ease", // Thêm hiệu ứng transition nếu muốn
                }}
              >
                {registerError?.message}
              </Text>
            }
            <Group justify="space-between" mt="lg">
              <Checkbox
                label="I accept terms and conditions"
                onChange={(e) => {
                  form.setFieldValue("checkbox", e.currentTarget.checked);
                }}
              />
            </Group>
            <Button
              type="submit"
              fullWidth
              mt="xl"
              disabled={!form.values.checkbox}
            >
              {isRegisterLoading ? "Loading..." : "Register"}
            </Button>
          </Paper>
        </Container>
      </form>
    </>
  );
};
export default Register;
