"use client"
import { jwtVerify } from 'jose';
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useState } from 'react'
import { AuthValuesType, UserDataType } from './types'
import { apiUserLogin } from '@/services/Employee/LoginApi'
import { useCookies } from 'next-client-cookies';

import {
	Auth,
	OAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { authFirebase } from './AuthFirebase'

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
	logout: () => Promise.resolve(),
	doSignInWithMicrosoft: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

type Props = {
	children: ReactNode
}
const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

const AuthProvider = ({ children }: Props) => {

	const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
	const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
	const cookies = useCookies()

	const router = useRouter()

	const doSignInWithMicrosoft = async () => {
		const provider = new OAuthProvider('microsoft.com');

		// Set all custom parameters in one go
		provider.setCustomParameters({
			prompt: 'consent', // Force re-consent
			login_hint: 'user@catconsulting.co', // Pre-fill email for the login
			tenant: process.env.NEXT_PUBLIC_TENANT_ID!
		});

		const auth: Auth = authFirebase;

		try {
			const result = await signInWithPopup(auth, provider);
			const idToken = await result.user.getIdToken()

			if (idToken) {
				const res = await apiUserLogin(idToken);
				if (res) {
					window.localStorage.setItem('at', JSON.stringify(res).slice(1, -1));
					console.log("process.env.JWT_SECRET: ",process.env.JWT_SECRET)
					console.log("JWT_SECRET: ",secretKey)
					// Verify the JWT with the secret key and extract the payload
					const { payload } = await jwtVerify(JSON.stringify(res).slice(1, -1), secretKey);

					// Validate and cast the payload as UserDataType
					const userInfo: UserDataType = payload as UserDataType;
					window.localStorage.setItem('roleName', userInfo?.roleName!);
					window.localStorage.setItem('exp', String(userInfo?.exp)!);
					setUser(userInfo);
					cookies.set('token', JSON.stringify(res).slice(1, -1));
					router.push("/employee");
				} else {
					throw new Error('Login failed');
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

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
		// login: handleLogin,
		logout: handleLogout,
		doSignInWithMicrosoft
	}

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
