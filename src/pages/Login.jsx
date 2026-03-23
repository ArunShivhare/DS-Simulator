import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white">

      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl text-center w-87">

        <h2 className="text-3xl font-bold mb-4">
          Welcome Back 👋
        </h2>

        <p className="text-gray-300 mb-6 text-sm">
          Login to continue your DSA journey
        </p>

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

      </div>

    </div>
  );
};

export default Login;