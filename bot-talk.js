const LWAuth = require("./lw-auth");
const axios = require("axios");

// ---- ボットの設定 ----
const botId = 123456;
const userId = "【ユーザーID】";  // example.taro@line-works-domain

async function talkToUser(accessToken, botId, userId) {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  // @see https://developers.worksmobile.com/jp/reference/bot-user-message-send
  // @see https://developers.worksmobile.com/jp/reference/bot-send-content

  const res = await axios.post(`https://www.worksapis.com/v1.0/bots/${botId}/users/${userId}/messages`, {
    content: {
      type: "sticker",
      packageId: "1",
      stickerId: "2",
    }
  }, { headers });
}

async function main() {
  const accessToken = await LWAuth.getAccessToken();
  await talkToUser(accessToken, botId, userId);
}

main().catch((raeson) => {
  console.error("エラー", raeson);
});
