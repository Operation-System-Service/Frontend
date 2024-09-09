export const createNewUserAPIError: Record<number, string> = {
	4004: 'This email is already in the system.',
	4040: 'The email was not found in the system.',
}

export interface APIErrorResponse {
	error: string
}
