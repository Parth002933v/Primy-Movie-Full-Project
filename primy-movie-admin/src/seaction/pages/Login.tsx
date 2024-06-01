import React, { useState, FormEvent } from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import logo from "../../../public/logo/light_logo.png";
import { useNavigate } from "react-router-dom";

interface loginDatarespose {
  accessToken: string;
  refreshToken: string;
}

interface loginRespose {
  statusCode: number;
  data: loginDatarespose;
}

const Login: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state before new request

    axios
      .post(`${import.meta.env.VITE_API_URL}/admin/login`, { password })
      .then((res) => {
        if (res.status === 200) {
          const { data }: loginRespose = res.data;

          console.log(data);

          if (
            signIn({
              auth: {
                token: data.accessToken,
                type: "Bearer",
              },

              userState: data.accessToken,
            })
          ) {
            console.log(res);

            localStorage.setItem("token", data.accessToken);

            navigate("/");
          } else {
            setError("Failed to sign in");
          }
        }
      })
      .catch((err: any) => {
        if (axios.isAxiosError(err)) {
          setError(
            err.response?.data.message ||
              err.message ||
              "An unknown error occurred"
          );
        } else {
          setError(err.message);
        }
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="bg-muted font-[sans-serif] text-[#333]">
          <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
              <img src={logo} alt="logo" className="w-40 mb-10" />
              <h2 className="text-center text-xl font-extrabold">
                If you are admin then you know the password
              </h2>

              <div className="mt-10 space-y-4">
                <div>
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                    placeholder="Password"
                  />
                </div>
                <div className="!mt-10">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Log in
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-lg text-center mt-4">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
