import { motion } from "framer-motion"

const timings = [
  {
    time: "16:00",
    title: "СБОР ГОСТЕЙ",
    description:
      "Время пролетит незаметно за игристым и общением с другими гостями",
  },
  {
    time: "17:00",
    title: "ЦЕРЕМОНИЯ",
    description: "Время приготовить носовые платочки для трогательного момента",
  },
  {
    time: "18:00",
    title: "СВАДЕБНЫЙ БАНКЕТ",
    description: "Время вкусной еды, танцев и развлечений",
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const TimingSection = () => {
  return (
    <section className="relative py-20 bg-white text-center px-6 max-w-2xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-6xl font-light mb-12 font-[PassionsConflict]"
      >
        Тайминг
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="block leading-0 pl-20 text-4xl"
        >
          нашего дня
        </motion.span>
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-12 relative z-10"
      >
        {timings.map((item, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.03 }}
            className="relative z-10"
          >
            <motion.h3 className="text-3xl font-light mb-1">
              {item.time}
            </motion.h3>
            <motion.h4 className="text-xl font-light tracking-wide uppercase mb-2">
              {item.title}
            </motion.h4>
            <motion.p className="text-gray-700 text-sm sm:text-base max-w-md mx-auto font-[Involve]">
              {item.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      {/* Optional Decorative Line (simplified) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      >
        <svg viewBox="0 0 400 600" className="w-full h-full opacity-10">
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M 20 60 C 100 100, 300 100, 200 180
               S 100 300, 200 350
               S 300 500, 100 550"
            stroke="gray"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </motion.div>
    </section>
  )
}

export default TimingSection
