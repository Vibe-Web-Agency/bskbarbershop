import React from 'react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">

      {/* BACKGROUND BLUR VIDEO (covers screen) */}
      <video
        src="/assets/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="
          absolute inset-0 w-full h-full object-cover
          blur-1xl opacity-40
        "
      />


      <div className="absolute inset-0 flex items-center justify-center">
        <video
          src="/assets/home/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="
            h-[90vh] w-auto 
            object-cover rounded-xl shadow-2xl
          "
        />
      </div>


      <div className="absolute inset-0 bg-black/25"></div>


      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        <h1 className={`text-5xl md:text-6xl font-bold text-[#F5F5F5] drop-shadow-xl`}>
          BSK Barbershop
        </h1>

        <p className="mt-4 text-lg md:text-xl text-[#D0D0D0] max-w-2xl">
          Excellence, style et savoir-faire.  
          Une expérience unique pour sublimer votre image.
        </p>

        <Link
          href="/reserver"
          className="
            mt-8 inline-block
            px-8 py-3
            rounded-lg
            bg-[#C6A667] text-black font-semibold
            hover:bg-[#9B8452] transition-colors
          "
        >
          Prendre rendez-vous
        </Link>
      </div>
    </section>
  )
}

export default Hero