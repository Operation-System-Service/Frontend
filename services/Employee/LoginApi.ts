
import axios from "axios";
export async function apiUserLogin(idToken: string): Promise<string | null> {
  try {

    const requestBody = {
      token: idToken,
    }

    const response = await axios.post(`/api/login`, requestBody);
    if (response.status === 200) {
      console.log(response.data)
      return String(response.data.AccessToken);
    }

    return null
  } catch (error) {
    console.error(error);
    return null
  }
}
