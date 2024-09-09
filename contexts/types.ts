import { UserRole } from "@/services/api"


export type ErrCallbackType = (err: { [key: string]: string }) => void

export type SignInUserCredential = {
	email: string
	password: string
	rememberMe?: boolean
}
export type LoginResponse = {
	Code: string
	AccessToken: string
}

export type UserDataType = {
	email: string
	employeeID: string
	exp: number
	name: string
	roleName: string
}

export type AuthValuesType = {
	loading: boolean
	logout: () => void
	user: UserDataType | null
	setLoading: (value: boolean) => void
	setUser: (value: UserDataType | null) => void
	login: (email: string, password :string) =>  Promise<void>;
}
