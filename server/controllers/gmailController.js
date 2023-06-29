const path = require("path");
const { authenticate } = require("@google-cloud/local-auth");
const { google } = require("googleapis");

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.labels",
  "https://mail.google.com/",
];

const labelName = "Vacation Auto-Reply";

const authenticateGmail = async () => {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, "../credGoogle.json"),
    scopes: SCOPES,
  });

  return google.gmail({ version: "v1", auth });
};

const getUnrepliedMessages = async (gmail) => {
  const response = await gmail.users.messages.list({
    userId: "me",
    labelIds: ["INBOX"],
    q: "is:unread",
  });

  return response.data.messages || [];
};

const createLabel = async (gmail) => {
  try {
    const response = await gmail.users.labels.create({
      userId: "me",
      requestBody: {
        name: labelName,
        labelListVisibility: "labelShow",
        messageListVisibility: "show",
      },
    });

    return response.data.id;
  } catch (error) {
    if (error.code === 409) {
      const response = await gmail.users.labels.list({
        userId: "me",
      });

      const label = response.data.labels.find(
        (label) => label.name === labelName
      );

      return label.id;
    } else {
      throw error;
    }
  }
};

const sendReply = async (gmail, email, labelId) => {
  const replyMessage = {
    userId: "me",
    resource: {
      raw: Buffer.from(
        `To: ${
          email.payload.headers.find((header) => header.name === "From").value
        }\r\n` +
          `Subject: Re: ${
            email.payload.headers.find((header) => header.name === "Subject")
              .value
          }\r\n` +
          `Content-Type: text/plain; charset="UTF-8"\r\n` +
          `Content-Transfer-Encoding: 7bit\r\n\r\n` +
          `Hello! I will go through your mail, right now apology from my end as I am stuck in some work\r\n`
      ).toString("base64"),
    },
  };

  await gmail.users.messages.send(replyMessage);

  await gmail.users.messages.modify({
    userId: "me",
    id: email.id,
    resource: {
      addLabelIds: [labelId],
      removeLabelIds: ["INBOX"],
    },
  });
};

module.exports = {
  authenticateGmail,
  getUnrepliedMessages,
  createLabel,
  sendReply,
};
