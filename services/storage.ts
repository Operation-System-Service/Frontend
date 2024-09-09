export class Storage {
	private static _instance: Storage = new Storage()

	constructor() {
		if (Storage._instance) {
			throw new Error('Error: Instantiation failed: Use Storage.getInstance() instead of new.')
		}
		Storage._instance = this
	}

	public static getInstance(): Storage {
		return Storage._instance
	}

	public clearSessionToken() {
		sessionStorage.removeItem('sessionToken')
	}

	public setSessionToken(value: string) {
		sessionStorage.setItem('sessionToken', value)
	}
	public setExpire(value: string) {
		sessionStorage.setItem('exp', value)
	}
	public getExpire() {
		if (typeof window !== 'undefined') {
			return sessionStorage.getItem('exp') || null
		}
	}

	public getSessionToken() {
		if (typeof window !== 'undefined') {
			return sessionStorage.getItem('sessionToken') || null
		}
	}

	public clearAllSession() {
		this.clearSessionToken()
	}
}
