import {authRequest} from "amaker/app/api/config";

const chatApi = {
  fileChat: (chatRoomId, filePath) => authRequest.post(`/api/v1/chat-rooms/${chatRoomId}/chats/file`, {
    path: filePath
  })
}

export default chatApi