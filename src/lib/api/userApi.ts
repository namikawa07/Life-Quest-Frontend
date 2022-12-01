import client from './client'

class UserApiService {
  static async getMyProfile() {
    const response = await client.get(`/users/current_user`).catch((error) => {
      throw new Error(error.message)
    })
    return response.data
  }
}

export default UserApiService
