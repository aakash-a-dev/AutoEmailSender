const {
    authenticateGmail,
    getUnrepliedMessages,
    createLabel,
    sendReply,
  } = require("./gmailController");
  
  const main = async () => {
    const gmail = await authenticateGmail();
    const labelId = await createLabel(gmail);
  
    setInterval(async () => {
      const messages = await getUnrepliedMessages(gmail);
  
      if (messages && messages.length > 0) {
        for (const message of messages) {
          const messageData = await gmail.users.messages.get({
            userId: "me",
            id: message.id,
          });
  
          const email = messageData.data;
          const hasReplied = email.payload.headers.some(
            (header) => header.name === "In-Reply-To"
          );
  
          if (!hasReplied) {
            await sendReply(gmail, email, labelId);
          }
        }
      }
    }, 20000);
  };
  
  module.exports = {
    main,
  };  