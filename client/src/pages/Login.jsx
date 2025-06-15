import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setVisible(false);
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, pass }),
    });
    const data = await res.json();

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      navigate("/home");
    } else {
      alert(data.message);
      setVisible(true);
    }
  };
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src="bg.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <AnimatePresence>
      <div className="absolute inset-0 flex items-center justify-center ">
        {visible && (
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col backdrop-blur-sm bg-white/30 text-white p-8 rounded-xl shadow-xl space-y-4 w-full max-w-sm"
        >
          <h1 className="text-gray-700 text-3xl text-center p-3 font-bold">
            Log In
          </h1>
          <input
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className=" opacity-50 text-gray-700"
          ></input>
          <input
            placeholder="••••••••"
            value={pass}
            type="password"
            onChange={(e) => setPass(e.target.value)}
            className=" opacity-50 text-gray-700"
          ></input>
          <button
            type="submit"
            onClick={handleClick}
            className="text-gray-700 rounded-md mx-auto block bg-gray-300 p-2 hover:bg-gray-500 hover:text-gray-100 transition-all duration-300 m-4"
          >
            Submit
          </button>
          <p className="text-gray-700 text-center">
            Don't have an account? <Link to={"/Register"}>Register</Link>
          </p>
        </motion.form>
        )}
      </div>
      </AnimatePresence>

    </div>
  );
}

export default Login;
