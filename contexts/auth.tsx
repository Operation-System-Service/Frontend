
import { ReactNode, createContext, useContext } from 'react'
import { UserRole } from '@/services/api' 
import { Storage } from '@/services/storage' 
import  { jwtDecode }  from 'jwt-decode'

export type UserInfoSession = {
	email: string
	employeeID: string
	exp: number
	name: number
	roleName: UserRole
} | null

interface SessionProviderProps {
	children: ReactNode
}

interface AuthContext {
	Session: {
		getToken: () => string
		getUserInfo: () => UserInfoSession
	}
}

const defaultAuthState = {
	Session: {
		getToken: () => '',
		getUserInfo: () => null,
	},
}
const SessionContext = createContext<AuthContext>(defaultAuthState)

export function useSession() {
	return useContext(SessionContext)
}

export function SessionProvider({ children }: SessionProviderProps) {
	const storage = Storage.getInstance()

	return (
		<SessionContext.Provider
			value={{
				Session: {
					getToken: () => {
						return storage.getSessionToken() || ''
					},
					getUserInfo: () => {
						const token = storage.getSessionToken()
						if (token) {
							const decoded = jwtDecode(token) as UserInfoSession

							return decoded
						} else {
							return null
						}
					},
				},
			}}
		>
			{children}
		</SessionContext.Provider>
	)
}
