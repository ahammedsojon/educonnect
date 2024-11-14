import EmailTemplate from "@/components/EmailTemplate";

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (emailInfo) => {
  const response = await Promise.allSettled(
    emailInfo.map(async (data) => {
      if (data?.to && data?.subject && data?.message) {
        const to = data?.to;
        const subject = data.subject;
        const message = data.message;

        const sendInfo = await resend.emails.send({
          from: "ahammedsojon000@gmail.com",
          to,
          subject,
          react: EmailTemplate({ message }),
        });

        return sendInfo;
      } else {
        new Promise((reject) => {
          new Error(
            `Couldn't send email, please check the ${JSON.stringify(data)}.`
          );
        });
      }
    })
  );
};
