import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Inicio() {
  const navigate = useNavigate();

  const handleEntrar = () => {
    navigate("/participantes");
  };

  const carouselImages = ["/utl1.jpg"];
  const totalSlides = carouselImages.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  useEffect(() => {
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: width * currentSlide,
        behavior: "smooth",
      });
    }
  }, [currentSlide]);

  return (
    <div className="min-h-screen relative bg-black">
      <div
        ref={carouselRef}
        className="carousel w-full h-screen absolute inset-0 z-0 overflow-hidden"
      >
        {carouselImages.map((image, index) => (
          <div key={index} className="carousel-item w-full h-full">
            <img
              src={image}
              className="w-full h-full object-cover scale-110 opacity-90 animate-pulse-slow"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-10 bg-black/60"></div>

      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div
          className="w-full max-w-2xl px-10 py-12 rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl 
                        border border-white/20 text-center transform transition-all duration-500
                        hover:shadow-[0_0_40px_#47C5AE60] hover:-translate-y-1"
        >
          <img
            src="/logo.png"
            className="h-32 mx-auto mb-6 drop-shadow-[0_0_10px_#47C5AEaa]"
          />

          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl">
            Congreso de
          </h1>

          <h2
            className="text-4xl md:text-5xl font-extrabold mt-2"
            style={{ color: "#47C5AE", textShadow: "0 0 15px #47C5AE80" }}
          >
            Tecnologías de la Información
          </h2>

          <p className="mt-6 mb-10 text-lg text-gray-200 leading-relaxed">
            El evento que impulsa la innovación, el conocimiento y el futuro
            tecnológico en la UTL.
          </p>

          <button
            onClick={handleEntrar}
            className="px-10 py-3 text-lg font-semibold rounded-xl text-white shadow-lg 
             transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_#47C5AE80]"
            style={{
              background: "linear-gradient(135deg, #47C5AE, #2FA08C)",
            }}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
