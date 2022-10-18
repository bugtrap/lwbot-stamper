const LWAuth = require("./lw-auth");
const axios = require("axios");

// ---- ボットの登録情報 ----
const domainId = "【ドメインID】";
const adminUserId = "【ボット管理者のユーザーID】"; // admin@line-works-domain

/**
 * ボットを登録します
 */
async function registerBot(accessToken) {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  // @see https://developers.worksmobile.com/jp/reference/bot-create
  const res = await axios.post(`https://www.worksapis.com/v1.0/bots`, {
    botName: "【ボットの名前】",
    description: "【ボットの説明】",
    photoUrl: "https://localhost/bot.png",
    administrators: [adminUserId],
  }, { headers });

  console.log("[registerBot]", res.data);

  const { botId } = res.data;
  return botId;
}

/**
 * ボットをドメインに追加します
 */
async function registerBotToDomain(accessToken, botId, domainId) {
  const headers = {
    Authorization: `Bearer ${accessToken}`
  };

  // @see https://developers.worksmobile.com/jp/reference/bot-domain-register
  const res = await axios.post(`https://www.worksapis.com/v1.0/bots/${botId}/domains/${domainId}`, {
    botName: "ボットの名前",
    photoUrl: "https://localhost/bot.png",
    description: "ボットの説明",
    administrators: ["sample.taro@examplecorporation"],
  }, { headers });

  console.log("[registerBotToDomain]", res.data);
}

async function main() {
  const accessToken = await LWAuth.getAccessToken();
  const botId = await registerBot(accessToken);
  await registerBotToDomain(accessToken, botId, domainId);

  console.log("ボットID", botId);
}

main().catch((raeson) => {
  console.error("エラー", raeson);
});
