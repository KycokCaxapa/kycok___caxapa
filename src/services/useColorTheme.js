import { useEffect, useState } from 'react'

const themes = [
	{ color: '#32cd32', photo: 'src/assets/images/Йа/green.jpg' },
	{ color: '#ffd700', photo: 'src/assets/images/Йа/yellow.jpg' },
]

export const useColorTheme = () => {
	const savedColorTheme = localStorage.getItem('--main-color') || 0
	const savedPhoto = localStorage.getItem('photo')

	const [currentThemeIndex, setCurrentThemeIndex] = useState(() => {
		const savedColor = themes[savedColorTheme]?.color || themes[0].color
		return themes.findIndex(theme => theme.color === savedColor) || 0
	})
	const [currentPhoto, setCurrentPhoto] = useState(() => {
		const theme = themes[currentThemeIndex]
		return savedPhoto === theme.photo ? savedPhoto : theme.photo
	})

	useEffect(() => {
		localStorage.setItem('--main-color', currentThemeIndex)
		localStorage.setItem('photo', currentPhoto)
		document.documentElement.style.setProperty(
			'--main-color',
			themes[currentThemeIndex].color
		)
	}, [currentThemeIndex, currentPhoto])

	const toggleColor = () => {
		const nextIndex = (currentThemeIndex + 1) % themes.length
		document.documentElement.style.setProperty(
			'--main-color',
			themes[nextIndex].color
		)
		setCurrentThemeIndex(nextIndex)
		setCurrentPhoto(themes[nextIndex].photo)
	}

	return { currentPhoto, toggleColor }
}
