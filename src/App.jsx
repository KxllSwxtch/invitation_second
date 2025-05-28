import {
	HeroSection,
	SaveTheDateSection,
	TimingSection,
	LocationSection,
	DressCodeSection,
	DetailsSection,
	RSVPForm,
} from './components'
import AdminPage from './components/AdminPage'
import { Routes, Route } from 'react-router-dom'

const MainPage = () => (
	<>
		<HeroSection />
		<SaveTheDateSection />
		<TimingSection />
		<LocationSection />
		<DressCodeSection />
		<DetailsSection />
		<RSVPForm />
	</>
)

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<MainPage />} />
			<Route path='/admin' element={<AdminPage />} />
		</Routes>
	)
}

export default App
