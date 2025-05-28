import { motion } from 'framer-motion'

const DetailsSection = () => {
	return (
		<section className='bg-white py-10 px-4 sm:px-8 text-center max-w-2xl mx-auto'>
			<motion.h2
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7 }}
				className='text-6xl font-light mb-2 font-[PassionsConflict]'
			>
				Детали
			</motion.h2>

			<motion.p
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, delay: 0.2 }}
				className='text-gray-800 mt-6 text-base sm:text-lg leading-relaxed font-[Involve]'
			>
				Самым приятным знаком внимания для нас станет ваш тёплый взгляд, улыбка
				и искренние пожелания.
				<br className='hidden sm:block' />
				Если вы захотите поздравить нас ещё и подарком — вместо цветов мы будем
				благодарны за конверт, который поможет нам осуществить наши семейные
				планы.
			</motion.p>
		</section>
	)
}

export default DetailsSection
