import { ChangeEvent, FormEvent, memo, useState } from 'react'

function SearchForm({ onSubmit }: { onSubmit: Function }) {
	const [keyword, setKeyword] = useState('')

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onSubmit({ keyword })
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value)
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				value={keyword}
				onChange={handleChange}
				className='Home-search-input'
				placeholder='Search a gif here'
			/>
		</form>
	)
}

export default memo(SearchForm)