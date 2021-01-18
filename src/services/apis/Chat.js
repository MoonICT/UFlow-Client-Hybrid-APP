import { Axios, parseQuery } from '@Services/http';

/**
 * [contract-chat-1] 채팅 내역 List chat contract
 *
 * @param warehouseRegNo 창고 ID
 * @param rentUserNo 임차인 ID
 * @param size 페이지 크기
 * @param page 페이지 default 0
 * @param sort id.chatSeq
 * @returns {Promise<*>}
 */
export const getListChat = ({warehouseRegNo = "",
                              rentUserNo = null,
                              size = 100,
                              page = 0,
                            }) => {
  return Axios.getRequest({
    url: `/api/v1/chat/contract/${warehouseRegNo}-${rentUserNo}${parseQuery({
      size: size,
      page: page,
    })}`,
    requiresToken: true
  });
};

/**
 * [contract-chat-2] 임차인 채팅 등록 Create tenant chat
 *
 * @param chatCount 채팅내용
 * @param warehouseRegNo 창고ID
 * @param rentUserNo 임차인ID
 * @returns {Promise<*>}
 */
export const chatOwner = ({chatDvCd = "TXT", chatCount = "", warehouseRegNo = "", rentUserNo = ''}) => {
  return Axios.postRequest({
    url: `/api/v1/chat/contract/owner/${rentUserNo}`,
    payload: {
      chatDvCd: chatDvCd,
      warehouseRegNo: warehouseRegNo,
      chatCount: chatCount,
    },
    requiresToken: true
  });
};

/**
 * [contract-chat-3] 창고주 채팅 등록 Create owner chat
 * @param chatCount 채팅내용
 * @param warehouseRegNo 창고 ID
 * @returns {Promise<*>}
 */
export const chatTenant = ({chatDvCd = "TXT", chatCount = "", warehouseRegNo = ""}) => {
  return Axios.postRequest({
    url: `/api/v1/chat/contract/tenant`,
    payload: {
      chatDvCd : chatDvCd,
      warehouseRegNo: warehouseRegNo,
      chatCount: chatCount,
    },
    requiresToken: true
  });
};
