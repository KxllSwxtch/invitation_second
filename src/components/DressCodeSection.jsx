import { motion } from "framer-motion"

const palette = [
  "#F9F6EF", // светлый
  "#D3E6EE", // оливковый
  "#E0F0D1", // тёплый беж
  "#FAE0D2", // глубокий коричневый
  "#DABAA3", // глубокий коричневый
  "#1D1D1D", // глубокий коричневый
]

const photoData = [
  {
    src: "/images/dress-white.jpg",
    label: "белый и бежевый",
    className: "rotate-[-2deg] ml-auto mr-10",
  },
  {
    src: "/images/dress-green.jpg",
    label: "оливковый и зелёный",
    className: "rotate-[2deg] ml-10 mt-[-40px]",
  },
  {
    src: "/images/dress-mocha.jpg",
    label: "коричневый и мокко",
    className: "rotate-[-1deg] ml-auto mr-10 mt-[-20px]",
  },
]

const colorVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

const DressCodeSection = () => {
  return (
    <section className="bg-[#e7eae4] py-20 px-4 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto bg-white rounded-xl p-6 sm:p-10 shadow-md"
      >
        {/* Заголовок */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-light text-center mb-2 font-[PassionsConflict]"
        >
          Дресс-код нашего торжества
        </motion.h2>

        {/* Текст */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-800 mt-6 mb-8 text-base sm:text-lg leading-relaxed text-center font-[Involve]"
        >
          Мы хотим создать особенную атмосферу и эстетику в этот прекрасный
          день, поэтому просим вас учесть пастельную цветовую гамму при выборе
          наряда.
        </motion.p>

        {/* Цветовая палитра */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center gap-4 mb-12"
        >
          {palette.map((color, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={colorVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full shadow-inner"
              style={{ backgroundColor: color }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default DressCodeSection
