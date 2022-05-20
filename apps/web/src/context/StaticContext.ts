import { createContext } from 'react'

export const contextValue = {
	name: 'Juan',
	status: true,
}

const Context = createContext({})
/* {} -> Value showed when the component doesn't have access to provider */

export default Context
