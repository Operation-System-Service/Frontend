
import axios from "axios";
export async function apiUserLogin(idToken: string): Promise<string | null> {
  try {

    const requestBody = {
      token: idToken,
    }

    const response = await axios.post(`/api/login`, requestBody);
    if (response.status === 200) {
      return String(response.data.AccessToken);
    }

    return null
  } catch (error) {
    return null
  }
}
