import axios from 'axios'

export const fetchRepos = async () => {
	try {
		const request = await axios
			.get('https://api.github.com/users/KycokCaxapa/repos')
			.then(response => response.data)
		return request
	} catch (error) {
		console.error(`Ошибка при получении репозиториев: ${error}`)
		throw error
	}
}

export const fetchLanguages = async () => {
	try {
		const repos = await fetchRepos()
		const languages = new Set()

		for (const repo of repos) {
			if (repo.language) languages.add(repo.language.toLowerCase())
		}
	
		return languages
	} catch (error) {
		console.error(`Ошибка при получении языков: ${error}`)
		throw error
	}
}
