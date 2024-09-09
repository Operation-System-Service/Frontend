import { useContext } from 'react'
import { AuthContext } from './AuthContext'
import { AuthValuesType } from './types'

export const useAuthens = (): AuthValuesType => useContext(AuthContext)
