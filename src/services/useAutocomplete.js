import { useEffect, useState } from 'react'

import { fetchLanguages } from './api'

export const useAutocomplete = () => {
	const [languages, setLanguages] = useState([])
	const [searchInput, setSearchInput] = useState('')
	const [suggestion, setSuggestion] = useState('')

	useEffect(() => {
		const loadLanguages = async () => {
			try {
				const data = Array.from(await fetchLanguages())
				setLanguages(data)
			} catch (error) {
				console.error(`Ошибка при получении языков: ${error}`)
				throw error
			}
		}
		loadLanguages()
	}, [])

	const handleChange = e => {
		const input = e.target.value.toLowerCase()
		setSearchInput(input)

		if (input === '') {
			setSuggestion('')
			return
		}

		const matchingLanguage = languages.find(language =>
			language.toLowerCase().startsWith(input.toLowerCase())
		)

		if (
			matchingLanguage &&
			matchingLanguage.toLowerCase() !== input.toLowerCase()
		) {
			setSuggestion(matchingLanguage.slice(input.length))
		} else {
			setSuggestion('')
		}
	}

	const handleKeyDown = e => {
		if (e.key === 'Enter' || e.key === 'Tab') {
			e.preventDefault()
			setSearchInput(searchInput + suggestion)
			setSuggestion('')
		}
	}
	return { searchInput, languages, suggestion, handleChange, handleKeyDown }
}
