import {request, authRequest} from './config';

const userApi = {
  login: (authToken) => request.post(`/api/v1/auth/code/google?code=${authToken}`),
  emailCheck: (email) => authRequest.get(`/api/v1/users/email/exists?email=${email}`),
};

export default userApi;