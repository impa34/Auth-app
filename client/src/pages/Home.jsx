import { useEffect, useState } from "react";
import { motion } from "framer-motion";


function Home() {
  const [message, setMessage] = useState("");
  const [bgLoaded, setBgLoaded] = useState(false);


  useEffect(() => {
    const img = new Image();
    img.src = "bg.jpg";
    img.onload = () => setBgLoaded(true);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetch("http://localhost:3000/api/auth/home", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authorized");
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch(() => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      })
  }, []);

  if (!bgLoaded)
    return (
      <div className="w-full h-screen bg-black text-white flex justify-center items-center">
        Loading...
      </div>
    );

  return (
    <div className="relative w-full bg-black text-purple-200 h-screen overflow-hidden"> 
      <motion.img
        src="bg.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
        }}
      />


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full h-full flex flex-col justify-center items-center"
      >
        <h1 className="text-3xl font-bold mb-4">Home</h1>
        <p className="text-lg mb-20">{message}</p>
      </motion.div>
    </div>
  );
}

export default Home;
