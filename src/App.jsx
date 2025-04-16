import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react"

export default function App() {
  const [isLocked, setIsLocked] = useState(true);
  const menuRef = useRef(null);

  useEffect (() => {
    const savedLockStatus = localStorage.getItem("isLocked");
    if (savedLockStatus !== null) {
      setIsLocked(JSON.parse(savedLockStatus));
    }

    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLocked]);

  const handleOpen = () => {
    setIsLocked(false);
    localStorage.setItem("isLocked", JSON.stringify(false));
    setTimeout(() => {
      menuRef.current?.scrollIntoView({behavior: "smooth"});
    }, 200);
  };

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY === 0 && !isLocked) {
        setIsLocked(true);
        localStorage.setItem("isLocked", JSON.stringify(true));
      }
    };

    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [isLocked]);

  return (
    <div className="font-poppins">
      {/* hero */}
      <div className="relative h-screen bg-cover bg-center">
        <div className="bg-[url('/image/Luxurious%20Wallpaper.jpg')] absolute inset-0 opacity-90 h-screen z-0 bg-cover bg-center"></div>
          
        <div className="relative z-10 h-full flex flex-col items-center justify-center">
          <div className="bg-[url('/image/weed.png')] h-[400px] sm:h-[600px] w-[300px] sm:w-[600px] z-10 bg-cover bg-center flex flex-col gap-3 sm:gap-5 justify-center items-center">
            <p className="mt-14 text-sm sm:text-md">The Wedding Of</p>
            <h1 className="text-2xl sm:text-4xl">LAILA & DAMAR</h1>
            <div className="flex flex-col gap-1 justify-center items-center">
              <p className="text-sm sm:text-md">Yth.</p>
              <p className="text-sm sm:text-md">Bapak/ Ibu/ Saudara/ i</p>
              <p className="text-sm sm:text-md">haha</p>
            </div>
            <button onClick={handleOpen} className="bg-blue-950 text-white p-2 rounded-lg text-sm sm:text-md">Open</button>
          </div>
        </div>
      </div>

      {/* pembukaan */}
      <div ref={menuRef} className="bg-[url('/image/Luxurious%20Wallpaper.jpg')] min-h-screen bg-cover bg-center bg-fixed">
        af
      </div>
    </div>
  )
}