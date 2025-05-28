import React, { useState, Suspense } from 'react'
// убедись, что путь к ../firebase указывает на инициализированный Firebase app
import { db } from '../firebase' // убедись, что путь к firebase.js правильный
import { collection, addDoc } from 'firebase/firestore'
import { motion, AnimatePresence } from 'framer-motion'

// Анимированный компонент конфетти
const ConfettiParticle = ({ delay }) => (
	<motion.div
		className='absolute w-2 h-2 rounded-full'
		style={{
			backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'][
				Math.floor(Math.random() * 5)
			],
		}}
		initial={{
			opacity: 0,
			scale: 0,
			x: Math.random() * 400 - 200,
			y: 50,
		}}
		animate={{
			opacity: [0, 1, 1, 0],
			scale: [0, 1, 1, 0],
			y: [-100, -200],
			rotate: [0, 360],
		}}
		transition={{
			duration: 2,
			delay: delay,
			ease: 'easeOut',
		}}
	/>
)

// Анимированная галочка
const CheckmarkIcon = () => (
	<motion.svg
		width='64'
		height='64'
		viewBox='0 0 24 24'
		fill='none'
		className='text-green-500'
		initial={{ scale: 0 }}
		animate={{ scale: 1 }}
		transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
	>
		<motion.circle
			cx='12'
			cy='12'
			r='10'
			stroke='currentColor'
			strokeWidth='2'
			fill='none'
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
			transition={{ duration: 0.8, ease: 'easeInOut' }}
		/>
		<motion.path
			d='M8 12l2 2 4-4'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
			fill='none'
			initial={{ pathLength: 0 }}
			animate={{ pathLength: 1 }}
			transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
		/>
	</motion.svg>
)

// Компонент красивого подтверждения
const SuccessConfirmation = () => {
	const confettiCount = 20

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 shadow-lg overflow-hidden'
		>
			{/* Конфетти */}
			{Array.from({ length: confettiCount }, (_, i) => (
				<ConfettiParticle key={i} delay={i * 0.1} />
			))}

			{/* Основной контент */}
			<motion.div
				className='relative z-10 text-center'
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.3, duration: 0.6 }}
			>
				{/* Анимированная галочка */}
				<motion.div
					className='flex justify-center mb-4'
					whileHover={{ scale: 1.1 }}
					transition={{ type: 'spring', stiffness: 300 }}
				>
					<CheckmarkIcon />
				</motion.div>

				{/* Заголовок */}
				<motion.h3
					className='text-2xl font-bold text-gray-800 mb-2 font-[PassionsConflict]'
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.5, duration: 0.6 }}
				>
					Спасибо!
				</motion.h3>

				{/* Основной текст */}
				<motion.p
					className='text-gray-600 mb-4 font-[Involve]'
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.7, duration: 0.6 }}
				>
					Ваша анкета успешно отправлена.
					<br />
					Мы очень рады, что вы будете с нами!
				</motion.p>

				{/* Декоративные элементы */}
				<motion.div
					className='flex justify-center space-x-2 text-2xl'
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 1, type: 'spring', stiffness: 200 }}
				>
					<motion.span
						animate={{ rotate: [0, 15, -15, 0] }}
						transition={{
							duration: 2,
							repeat: Infinity,
							repeatType: 'reverse',
						}}
					>
						💖
					</motion.span>
					<motion.span
						animate={{ y: [0, -5, 0] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							repeatType: 'reverse',
							delay: 0.3,
						}}
					>
						✨
					</motion.span>
					<motion.span
						animate={{ rotate: [0, -15, 15, 0] }}
						transition={{
							duration: 2,
							repeat: Infinity,
							repeatType: 'reverse',
							delay: 0.6,
						}}
					>
						🎉
					</motion.span>
				</motion.div>
			</motion.div>

			{/* Фоновые декоративные элементы */}
			<motion.div
				className='absolute top-4 right-4 w-8 h-8 bg-pink-200 rounded-full opacity-60'
				animate={{
					scale: [1, 1.2, 1],
					rotate: [0, 180, 360],
				}}
				transition={{
					duration: 4,
					repeat: Infinity,
					ease: 'easeInOut',
				}}
			/>
			<motion.div
				className='absolute bottom-4 left-4 w-6 h-6 bg-blue-200 rounded-full opacity-60'
				animate={{
					scale: [1, 0.8, 1],
					rotate: [0, -180, -360],
				}}
				transition={{
					duration: 3,
					repeat: Infinity,
					ease: 'easeInOut',
					delay: 1,
				}}
			/>
		</motion.div>
	)
}

const RSVPForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		attendance: '',
		drinks: [],
	})

	const [submitted, setSubmitted] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target

		if (type === 'checkbox') {
			setFormData((prev) => ({
				...prev,
				drinks: checked
					? [...prev.drinks, value]
					: prev.drinks.filter((item) => item !== value),
			}))
		} else if (type === 'radio') {
			setFormData((prev) => ({ ...prev, attendance: value }))
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }))
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setLoading(true)
			await addDoc(collection(db, 'rsvp_responses'), formData)
			setSubmitted(true)
			setFormData({ name: '', attendance: '', drinks: [] })
			setLoading(false)
		} catch (error) {
			console.error('Ошибка при отправке:', error)
			alert('Произошла ошибка при отправке данных.')
			setLoading(false)
		}
	}

	const formVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1,
				when: 'beforeChildren',
			},
		},
		exit: {
			opacity: 0,
			y: -20,
			transition: {
				duration: 0.4,
			},
		},
	}

	const itemVariants = {
		hidden: { opacity: 0, x: -10 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: 'spring', stiffness: 200 },
		},
	}

	return (
		<div className='max-w-xl mx-auto'>
			<AnimatePresence mode='wait'>
				{submitted ? (
					<motion.div
						key='success'
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ type: 'spring', stiffness: 300, damping: 20 }}
					>
						<Suspense fallback={<div>Загрузка...</div>}>
							<SuccessConfirmation />
						</Suspense>
					</motion.div>
				) : (
					<motion.form
						key='form'
						initial='hidden'
						animate='visible'
						exit='exit'
						variants={formVariants}
						onSubmit={handleSubmit}
						className='p-6 bg-white shadow rounded space-y-6'
					>
						<motion.p
							variants={itemVariants}
							className='text-center font-[Involve]'
						>
							Чтобы сделать празднование комфортным, пожалуйста, заполните
							анкету и подтвердите участие до <strong>01.07.2025</strong>
						</motion.p>

						<motion.div variants={itemVariants}>
							<label className='block font-medium mb-1'>
								Ваше имя и фамилия
							</label>
							<motion.input
								whileFocus={{ scale: 1.02 }}
								transition={{ type: 'spring', stiffness: 300 }}
								type='text'
								name='name'
								required
								value={formData.name}
								onChange={handleChange}
								className='w-full border px-3 py-2 rounded'
								placeholder='ФИО'
							/>
						</motion.div>

						<motion.div variants={itemVariants}>
							<p className='font-medium mb-2'>Подтвердите своё присутствие</p>
							<motion.label
								whileHover={{ x: 5 }}
								transition={{ type: 'spring', stiffness: 300 }}
								className='block'
							>
								<input
									type='radio'
									name='attendance'
									value='буду'
									onChange={handleChange}
									className='mr-2'
									required
								/>
								Обязательно буду
							</motion.label>
							<motion.label
								whileHover={{ x: 5 }}
								transition={{ type: 'spring', stiffness: 300 }}
								className='block'
							>
								<input
									type='radio'
									name='attendance'
									value='не смогу'
									onChange={handleChange}
									className='mr-2'
								/>
								К сожалению, не смогу присутствовать
							</motion.label>
						</motion.div>

						<motion.div variants={itemVariants}>
							<p className='font-medium mb-2'>
								Ваши предпочтения по напиткам (можно выбрать несколько)
							</p>
							{[
								'Вино красное',
								'Вино белое',
								'Шампанское',
								'Виски',
								'Коньяк',
								'Водка',
								'Безалкогольные напитки',
							].map((drink) => (
								<motion.label
									key={drink}
									whileHover={{ x: 5 }}
									transition={{ type: 'spring', stiffness: 300 }}
									className='block'
								>
									<input
										type='checkbox'
										value={drink}
										checked={formData.drinks.includes(drink)}
										onChange={handleChange}
										className='mr-2'
									/>
									{drink}
								</motion.label>
							))}
						</motion.div>

						<motion.button
							variants={itemVariants}
							whileHover={{ scale: loading ? 1 : 1.05 }}
							whileTap={{ scale: loading ? 1 : 0.95 }}
							type='submit'
							disabled={loading}
							className='w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{loading ? (
								<motion.div
									className='flex items-center justify-center'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								>
									<motion.div
										className='w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2'
										animate={{ rotate: 360 }}
										transition={{
											duration: 1,
											repeat: Infinity,
											ease: 'linear',
										}}
									/>
									Отправка...
								</motion.div>
							) : (
								'Отправить'
							)}
						</motion.button>
					</motion.form>
				)}
			</AnimatePresence>
		</div>
	)
}

export default RSVPForm
