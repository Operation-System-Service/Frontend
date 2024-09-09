"use client"
import axios from 'axios'
import jwt_decode, { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useEffect, useState } from 'react'

import { UserInfoSession } from './auth'
import { AuthValuesType, UserDataType } from './types'
import { apiUserLogin } from '@/services/Employee/LoginApi'
import { useCookies } from 'next-client-cookies';
// import Cookies from "js-cookie";


const defaultProvider: AuthValuesType = {
	user: {
		email: "",
		employeeID: "",
		exp: 0,
		name: "",
		roleName: "",
	  },
	loading: true,
	setUser: () => null,
	setLoading: () => Boolean,
	login: (email: string, password: string) => Promise.resolve(),
	logout: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

type Props = {
	children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
	// const storage = Storage.getInstance()

	const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
	const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
	const cookies= useCookies()

	const router = useRouter()


	const handleLogin = async (email: string, password: string) => {
		try {
			window.localStorage.clear();
		
			let res = await apiUserLogin(email, password);
			if (res) {
				window.localStorage.setItem('at', JSON.stringify(res).slice(1, -1))
				let userInfo = jwtDecode(String(res)) as UserDataType
				window.localStorage.setItem('roleName', userInfo?.roleName!)
				window.localStorage.setItem('exp', String(userInfo?.exp)!)
				setUser(userInfo)
				// storage.setExpire(String(userInfo?.exp)!)
				cookies.set('token', JSON.stringify(res).slice(1, -1));
				router.push("/employee")
			}

		} catch (err) {
			console.log(err)
		}
	}

	const handleLogout = () => {
		setUser(null)
		window.localStorage.clear();
		cookies.remove('token')
		// storage.clearAllSession()
		router.push('/login')
	}

	const values = {
		user,
		loading,
		setUser,
		setLoading,
		login: handleLogin,
		logout: handleLogout,
	}

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
