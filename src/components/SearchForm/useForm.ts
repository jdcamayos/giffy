import { useReducer } from 'react'

const ACTIONS = {
	UPDATE_KEYWORD: 'update_keyword',
	UPDATE_RATING: 'update_rating',
}

const ACTIONS_REDUCERS = {
	[ACTIONS.UPDATE_KEYWORD]: (state: any, action: any) => ({
		...state,
		keyword: action.payload,
		times: state.times + 1,
	}),
	[ACTIONS.UPDATE_RATING]: (state: any, action: any) => ({ ...state, rating: action.payload }),
}

const reducer = (state: any, action: any) => {
	const actionReducer = ACTIONS_REDUCERS[action.type]
	return actionReducer ? actionReducer(state, action) : state
}

export default function useForm({
	initialKeyword,
	initialRating,
}: {
	initialKeyword?: string
	initialRating?: string
}) {
	const [state, dispatch] = useReducer(reducer, {
		keyword: initialKeyword,
		rating: initialRating,
		times: 0,
	})

	const { keyword, rating, times } = state

	const updateKeyword = (value: string) => dispatch({ type: ACTIONS.UPDATE_KEYWORD, payload: value })
	const updateRating = (value: string) => dispatch({ type: ACTIONS.UPDATE_RATING, payload: value })

	return {
		keyword,
		rating,
		times,
		updateKeyword,
		updateRating,
	}
}
