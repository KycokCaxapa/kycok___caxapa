import { useState, useEffect } from 'react'

export const useSystemTheme = () => {
	const getInitialTheme = () => {
		const savedSystemTheme = localStorage.getItem('systemTheme')
		
		if (savedSystemTheme) {
			return savedSystemTheme
		}
	}

	const [theme, setTheme] = useState(getInitialTheme)

	useEffect(() => {
		localStorage.setItem('systemTheme', theme)
		document.documentElement.setAttribute('systemTheme', theme)
	}, [theme])

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
		const handleChange = () => {
			const newTheme = mediaQuery.matches ? 'dark' : 'light'
			setTheme(newTheme)
		}
		mediaQuery.addEventListener('change', handleChange)
		return () => {
			mediaQuery.removeEventListener('change', handleChange)
		}
	}, [])

	return { theme, setTheme }
}
