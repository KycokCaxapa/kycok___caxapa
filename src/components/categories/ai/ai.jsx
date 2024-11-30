import { useEffect, useState } from 'react'

import { useAutocomplete } from '../../../services/useAutocomplete'
import { fetchRepos } from '../../../services/api'

import styles from './ai.module.css'

export default function AI() {
	const sortKeys = ['алфавиту', 'времени']
	const [currentKey, setCurrentKey] = useState(0)

	const nextKey = () => {
		setCurrentKey((currentKey + 1) % sortKeys.length)
	}

	const { searchInput, languages, suggestion, handleChange, handleKeyDown } =
		useAutocomplete()

	const [data, setData] = useState(null)
	const [filteredData, setFilteredData] = useState([])
	const [repos, setRepos] = useState([])

	const fetchData = async () => {
		const aiRepos = []
		setRepos(aiRepos)

		try {
			const response = await fetchRepos()
			const filteredResponse = response.filter(repo =>
				aiRepos.includes(repo.name)
			)
			setData(filteredResponse)
			const sorted = [...response].sort((a, b) => a.name.localeCompare(b.name))
			setFilteredData(sorted)
		} catch (error) {
			console.error('Ошибка при загрузке репозиториев:', error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		if (searchInput === '') {
			setFilteredData(data)
		} else {
			const matchingLanguage = data?.filter(repo =>
				repo.language.toLowerCase().startsWith(searchInput.toLowerCase())
			)
			setFilteredData(matchingLanguage)
		}
	}, [searchInput, data])

	useEffect(() => {
		if (!data) return

		const sorted = [...data].sort((a, b) => {
			switch (sortKeys[currentKey]) {
				case 'алфавиту':
					return a.name.localeCompare(b.name)
				case 'времени':
					return new Date(b.created_at) - new Date(a.created_at)
				default:
					return 0
			}
		})
		setFilteredData(sorted)
	}, [currentKey, data])

	return (
		<section className={styles.ai}>
			<h1 className={styles.title}>AI</h1>
			{repos.length === 0 ? (
				<h3 className={styles.emptyData}>Данные отсутствуют((</h3>
			) : (
				<>
					<div className={styles.filters}>
						<div className={styles.sort}>
							<h3 className={styles.sortKey}>Сортировать по</h3>
							<div className={styles.sortKeys}>
								{sortKeys.map((key, index) => {
									const position =
										index ===
										(currentKey - 1 + sortKeys.length) % sortKeys.length
											? 'Bottom'
											: 'Top'
									return (
										<h3
											key={index}
											className={styles[`sort${position}`]}
											onClick={position === 'Bottom' ? nextKey : undefined}
										>
											{key}
										</h3>
									)
								})}
							</div>
						</div>
						<div className={styles.searchBar}>
							<h3 className={styles.sortLanguage}>Язык:</h3>
							<search>
								<form action=''>
									<div className={styles.inputWrapper}>
										<span className={styles.searchInput}>{searchInput}</span>
										<span className={styles.suggestion}>{suggestion}</span>
									</div>
									<input
										type='search'
										placeholder={languages[0]}
										value={searchInput}
										onChange={handleChange}
										onKeyDown={handleKeyDown}
									/>
								</form>
							</search>
						</div>
					</div>
					<div className={styles.line}></div>
					<table>
						<thead>
							<tr>
								<th>Название</th>
								<th>Дата создания</th>
								<th>Язык</th>
							</tr>
						</thead>
						<tbody>
							{filteredData?.map(repo => (
								<tr>
									<td
										className={styles.repoName}
										onClick={() =>
											window.open(`https://github.com/${repo.full_name}`)
										}
									>
										{repo.name}
									</td>
									<td>
										{repo.created_at
											.substring(0, 10)
											.split('-')
											.reverse()
											.join('.')}
									</td>
									<td>{repo.language}</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}
		</section>
	)
}
