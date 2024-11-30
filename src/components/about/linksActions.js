import resume from '../../assets/resume.pdf'

export const handleViewTg = () => {
	window.open('https://t.me/sqrtnt')
}

export const handleCopyEmail = () => {
	const email = 'kycok.3ll.caxapa@gmail.com'

	navigator.clipboard
		.writeText(email)
		.then(() => {
			alert('Email скопирован')
		})
		.catch(e => {
			console.error('Не удалось скопировать Email.', e)
		})
}

export const handleCopyPhone = () => {
	const phone = '+7 (952) 502-58-19'

	navigator.clipboard
		.writeText(phone)
		.then(() => {
			alert('Номер телефона скопирован')
		})
		.catch(e => {
			console.error('Не удалось скопировать номер телефона.', e)
		})
}

export const handleViewGitHub = () => {
	window.open('https://github.com/KycokCaxapa')
}

export const handleViewResume = () => {
	window.open(resume, '_blank')
}
