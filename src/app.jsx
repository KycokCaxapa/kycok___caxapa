import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import Categories from './components/categories/categories'
import  { useSystemTheme } from './services/useSystemTheme'
import Web from './components/categories/web/web'
import AI from './components/categories/ai/ai'
import About from './components/about/about'

export default function App() {
	const { theme } = useSystemTheme()

	useEffect(() => {
		document.documentElement.setAttribute('systemTheme', theme)
	}, [theme])

	return (
		<>
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							<>
								<About />
								<Categories />
							</>
						}
					/>
					<Route path='/web' element={<Web />} />
					<Route path='/ai' element={<AI />} />
				</Routes>
			</Router>
		</>
	)
}
