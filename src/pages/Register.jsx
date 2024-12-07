import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useEffect } from "react";
import { useRegister } from "../hooks/useRegister";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let displayName = formData.get("displayName");
  let photoURL = formData.get("photoURL");
  let email = formData.get("email");
  let password = formData.get("password");
  return { displayName, photoURL, email, password };
};

function Register() {
  const { isPending, registerWithGoogle, registerEmailAndPassword } =
    useRegister();
  const data = useActionData();

  useEffect(() => {
    if (data) {
      registerEmailAndPassword(
        data.email,
        data.password,
        data.displayName,
        data.photoURL
      );
    }
  }, [data]);
  return (
    <div className="auth-container">
      <div className="auth-left"></div>
      <div className="auth-right">
        <Form
          method="post"
          className="flex flex-col gap-3 w-96 bg-base-100 shadow-xl p-8"
        >
          <h1 className="text-3xl font-semibold text-center">Register</h1>
          <FormInput
            name="displayName"
            type="text"
            placeholder="enter your name"
            label="Name"
          />
          <FormInput
            name="photoURL"
            type="url"
            placeholder="enter your photo URL"
            label="Photo URL"
          />
          <FormInput
            name="email"
            type="email"
            placeholder="enter your email"
            label="Email"
          />
          <FormInput
            name="password"
            type="password"
            placeholder="enter your password"
            label="Password"
          />
          <div>
            {isPending && (
              <button
                disabled
                type="submit"
                className="btn btn-primary btn-block"
              >
                Loading...
              </button>
            )}
            {!isPending && (
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            )}
          </div>
          <div>
            {isPending && (
              <button
                disabled
                onClick={registerWithGoogle}
                type="button"
                className="btn btn-secondary btn-block"
              >
                Loading...
              </button>
            )}
            {!isPending && (
              <button
                onClick={registerWithGoogle}
                type="button"
                className="btn btn-secondary btn-block"
              >
                Google
              </button>
            )}
          </div>
          <div className="text-center">
            <p className="text-slate-500">
              If you have a account,{" "}
              <Link className="link" to="/login">
                Login
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
