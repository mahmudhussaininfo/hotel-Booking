import axios from "axios";

//send sms
export const sendSms = async (to, msg) => {
  try {
    const response = await axios.get(
      `http://bulksmsbd.net/api/smsapi?api_key=${process.env.SMS_API}&type=text&number=${to}&senderid=${process.env.SMS_SENDER_ID}&message=${msg}`
    );
    return response.data; // ✅ Return something useful
  } catch (error) {
    console.error("SMS Error:", error.message);
    return null; // ✅ Return something even on error
  }
};
