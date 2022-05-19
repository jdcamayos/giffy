import './SearchForm.css'
import { ChangeEvent, FormEvent, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import useForm from './useForm'

const RATINGS = ['g', 'pg', 'pg-13', 'r']

interface Props {
	initialKeyword?: string
	initialRating?: string
}

function SearchForm({ initialKeyword, initialRating }: Props = { initialKeyword: 'random', initialRating: 'g' }) {
	const navigate = useNavigate()
	const { keyword, rating, updateKeyword, updateRating } = useForm({ initialKeyword, initialRating })
	/* const [rating, setRating] = useState(initialRating) */

	/* const reducer = (state: any, action: any) => {
		switch (action.type) {
			case ACTIONS.UPDATE_KEYWORD:
				return { ...state, keyword: action.payload, times: state.times + 1 }
			case ACTIONS.UPDATE_RATING:
				return { ...state, rating: action.payload }
			default:
				return state
		}
	} */

	/* const [state, dispatch] = useReducer(reducer, {
		rating: initialRating,
		keyword: initialKeyword,
		times: 0,
	}) */

	/* const { keyword, times, rating } = state */

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		navigate(`/search/${keyword}/${rating}`)
	}

	/* const updateKeyword = (keyword: string) => {
		setKeyword(keyword)
		setTimes(prevTime => prevTime + 1)
	} */

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		updateKeyword(e.target.value)
		/* updateKeyword(e.target.value) */
	}

	const handleChangeRating = (e: ChangeEvent<HTMLSelectElement>) => {
		updateRating(e.target.value)
		/* setRating(e.target.value) */
	}

	return (
		<form onSubmit={handleSubmit} className='SearchForm-container'>
			<input
				type='text'
				value={keyword}
				onChange={handleChange}
				className='SearchForm-input'
				placeholder='Search a gif here'
			/>
			<select value={rating} onChange={handleChangeRating} className='SearchForm-select'>
				<option disabled>Rating type</option>
				{RATINGS.map(rating => (
					<option key={rating}>{rating}</option>
				))}
			</select>
			<button className='SearchForm-button'>Go</button>
		</form>
	)
}

export default memo(SearchForm)
