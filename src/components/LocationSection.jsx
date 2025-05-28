import locationImage from '../assets/crystal.jpg'
import { motion } from 'framer-motion'

const LocationSection = () => {
	return (
		<section className='bg-white py-5 px-6 text-center max-w-2xl mx-auto'>
			<motion.h2
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7 }}
				className='text-6xl font-light mb-2 font-[PassionsConflict]'
			>
				Место проведения
			</motion.h2>

			<motion.p
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.7, delay: 0.2 }}
				className='text-base sm:text-lg text-gray-800 mt-4 mb-8 leading-relaxed font-[Involve]'
			>
				Банкетный зал "CRYSTAL HALL"
				<br />
				г. Алматы, ул. Ерубаева, 8/9
			</motion.p>

			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8, delay: 0.4 }}
				className='w-full overflow-hidden rounded-xl shadow-md'
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				<img
					src={locationImage}
					alt='Crystal Hall'
					className='w-full object-cover'
				/>
			</motion.div>
		</section>
	)
}

export default LocationSection
