import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils'
import useForm from './useForm'

const setup = ({ initialKeyword, initialRating }: { initialKeyword?: string; initialRating?: string } = {}) =>
	renderHook(() => useForm({ initialKeyword, initialRating }))

test('should change keyword', () => {
	const { result } = setup()
	act(() => {
		result.current.updateKeyword('batman')
	})
	expect(result.current.keyword).toBe('batman')
})

test('should use initial values', () => {
	const { result } = setup({ initialKeyword: 'matrix' })
	expect(result.current.keyword).toBe('matrix')
})

test('should update currently times when use twice', () => {
	const { result } = setup()
	act(() => {
		result.current.updateKeyword('b')
		result.current.updateKeyword('ba')
	})
	expect(result.current.times).toBe(2)
})
