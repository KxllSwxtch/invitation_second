import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'

const AdminPage = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [form, setForm] = useState({ login: '', password: '' })
	const [submissions, setSubmissions] = useState([])

	const handleLogin = (e) => {
		e.preventDefault()
		if (form.login === 'admin' && form.password === 'admin') {
			setIsLoggedIn(true)
		} else {
			alert('Неверный логин или пароль')
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const snapshot = await getDocs(collection(db, 'rsvp_responses'))
			setSubmissions(
				snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
			)
		}

		if (isLoggedIn) fetchData()
	}, [isLoggedIn])

	const handleDelete = async (id) => {
		await deleteDoc(doc(db, 'rsvp_responses', id))
		setSubmissions((prev) => prev.filter((item) => item.id !== id))
	}

	if (!isLoggedIn) {
		return (
			<form
				onSubmit={handleLogin}
				className='max-w-md mx-auto mt-20 p-6 bg-white shadow rounded space-y-4'
			>
				<input
					type='text'
					placeholder='Логин'
					value={form.login}
					onChange={(e) => setForm({ ...form, login: e.target.value })}
					className='w-full border px-3 py-2 rounded'
				/>
				<input
					type='password'
					placeholder='Пароль'
					value={form.password}
					onChange={(e) => setForm({ ...form, password: e.target.value })}
					className='w-full border px-3 py-2 rounded'
				/>
				<button
					type='submit'
					className='w-full bg-black text-white py-2 rounded'
				>
					Войти
				</button>
			</form>
		)
	}

	return (
		<div className='max-w-4xl mx-auto mt-10'>
			<h1 className='text-2xl font-bold mb-6 text-center'>Анкеты гостей</h1>
			<div className='space-y-4'>
				{submissions.map((entry, idx) => (
					<div key={idx} className='bg-white border rounded shadow p-4'>
						<p>
							<strong>Имя:</strong> {entry.name}
						</p>
						<p>
							<strong>Придёт:</strong> {entry.attendance}
						</p>
						<p>
							<strong>Напитки:</strong> {entry.drinks?.join(', ')}
						</p>
						<button
							onClick={() => handleDelete(entry.id)}
							className='mt-2 text-sm text-red-600 underline'
						>
							Удалить
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default AdminPage
