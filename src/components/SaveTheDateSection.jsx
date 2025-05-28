import { motion } from "framer-motion"

const SaveTheDateSection = () => {
  return (
    <section className="relative py-20 bg-white text-center px-4">
      {/* Background numbers */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 0.15, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-200 text-[120px] font-light leading-none select-none pointer-events-none"
      >
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="pl-4"
        >
          03
        </motion.div>
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="pl-4 -mt-8"
        >
          08
        </motion.div>
        <motion.div
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pl-4 -mt-8"
        >
          2025
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        <motion.h2
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-6xl sm:text-5xl font-[PassionsConflict] italic mb-6"
        >
          Дата свадьбы
        </motion.h2>
        <motion.p
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
          className="text-xl font-semibold mb-2"
        >
          03/08/2025
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-700 text-base sm:text-lg font-[Involve]"
        >
          Приглашаем присоединиться <br /> к нашему празднику <br /> и украсить
          его своим присутствием!
        </motion.p>
      </motion.div>
    </section>
  )
}

export default SaveTheDateSection
