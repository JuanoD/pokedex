import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Keyboard,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { user, userDetails } from "@/utils/fakeData/user";
import { useState } from "react";
import { useSetAtom } from "jotai";
import userAtom from "@/atoms/userAtom";

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const setUser = useSetAtom(userAtom);

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: Yup.object(getValidationSchema()),
    onSubmit: (values) => {
      const { username, password } = values;
      if (user.username !== username && user.password !== password) {
        return setError("Credenciales incorrectas");
      }
      setUser(userDetails);
      Keyboard.dismiss();
    },
  });

  let err;

  return (
    <View>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Usuario"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={(value) => formik.setFieldValue("username", value)}
      />
      {
        // I just wanted to test something like python walrus operator
        (err = formik.errors.username) && (
          <Text style={styles.error}>{err}</Text>
        )
      }
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(value) => formik.setFieldValue("password", value)}
        autoCapitalize="none"
      />
      {(err = formik.errors.password) && (
        <Text style={styles.error}>{err}</Text>
      )}
      <View style={styles.button}>
        <Button title="Acceder" onPress={formik.submitForm} />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  button: {
    margin: 12,
  },
});

function getInitialValues() {
  return {
    username: "",
    password: "",
  };
}

function getValidationSchema() {
  return {
    username: Yup.string().required("Requerido"),
    password: Yup.string().required("Requerido"),
  };
}
