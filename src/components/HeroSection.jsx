import { useEffect, useState } from "react"
import heroImage from "../assets/heroimage.png"
import flowerImage from "../assets/flower.png"
import { motion } from "framer-motion"

const weddingDate = new Date("2025-08-03T00:00:00")

const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate.getTime() - now

      const days = String(
        Math.floor(distance / (1000 * 60 * 60 * 24))
      ).padStart(2, "0")
      const hours = String(
        Math.floor((distance / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0")
      const minutes = String(
        Math.floor((distance / (1000 * 60)) % 60)
      ).padStart(2, "0")
      const seconds = String(Math.floor((distance / 1000) % 60)).padStart(
        2,
        "0"
      )

      if (distance < 0) {
        clearInterval(interval)
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" })
      } else {
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full bg-white relative overflow-hidden px-4 flex flex-col">
      {/* <img
				src={flowerImage}
				alt='hero'
				className='transform scale-x-[-1] block ml-[-100px] rotate-70 w-50'
			/> */}

      {/* Background numbers */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 0.15, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-[PassionsConflict] absolute right-0 text-gray-700 text-[200px] font-light leading-none select-none pointer-events-none top-[-40px]"
      >
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="pl-4"
        >
          Д
        </motion.div>
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pl-30 mt-[-130px]"
        >
          Э
        </motion.div>
      </motion.div>

      {/* Фото в жидкой форме (liquid SVG clipPath, как на референсе) */}
      <img
        src={heroImage}
        alt="hero"
        className="object-contain mb-[-80px] mt-40"
      />
      {/* Имена */}
      <motion.h1
        className="text-6xl sm:text-9xl font-[PassionsConflict] text-gray-800 text-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Дмитрий <br /> <span className="ml-20">и Элина</span>
      </motion.h1>

      <p className="text-sm text-gray-600 tracking-widest text-center mt-10 font-[Involve] mb-2">
        До начала свадьбы осталось
      </p>

      {/* Таймер */}
      <div className="flex gap-4 justify-center">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center w-16">
            <span className="text-3xl font-semibold text-gray-800">
              {value}
            </span>
            <span className="text-xs uppercase text-gray-500">
              {unit === "days"
                ? "дней"
                : unit === "hours"
                ? "часов"
                : unit === "minutes"
                ? "минут"
                : "секунд"}
            </span>
          </div>
        ))}
      </div>

      {/* Дорогие гости */}
      <div>
        <h1 className="text-3xl text-gray-800 font-[Involve] text-center mt-20 mb-3">
          Дорогие гости!
        </h1>
        <div className="flex justify-center">
          <p className="text-center font-[Involve] w-2/3">
            Мы бы хотели разделить <br /> с Вами радость неповторимого для нас
            дня - дня нашей свадьбы!
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
