import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useEffect, useState } from "react";
import { useRegister } from "../hooks/useRegister";
import { useLogin } from "../hooks/useLogin";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};

function Login() {
  const data = useActionData();
  const { isPending, registerWithGoogle } = useRegister();
  const { isPending: isPendingLogin, signIn } = useLogin();

  useEffect(() => {
    if (data) {
      signIn(data.email, data.password);
    }
  }, [data]);
  return (
    <div className="auth-container">
      <div className="auth-left"></div>
      <div className="auth-right">
        <Form
          method="post"
          className="flex flex-col gap-5 w-96 bg-base-100 shadow-xl p-8"
        >
          <h1 className="text-3xl font-semibold text-center">Login</h1>
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
            {isPendingLogin && (
              <button
                disabled
                type="submit"
                className="btn btn-primary btn-block"
              >
                Loading...
              </button>
            )}
            {!isPendingLogin && (
              <button type="submit" className="btn btn-primary btn-block">
                Login
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
              If you don't have a account,{" "}
              <Link className="link" to="/register">
                Register
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
