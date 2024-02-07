import functions from 'firebase-functions';
import axios from 'axios';
import qs from 'qs';

exports.sendWhatsAppMessage = functions.https.onRequest(async (req, res) => {
  try {
    // Get the image URL and recipient's phone number from the request
    const imageUrl = req.body.imageUrl;
    const recipientPhoneNumber = req.body.recipientPhoneNumber;

    // Prepare the data for the request
    const data = qs.stringify({
      token: '3pbxjpnq0pvlxr45',
      to: recipientPhoneNumber,
      image: imageUrl,
      caption: 'Image Caption',
    });

    // Configure the Axios request
    const config = {
      method: 'post',
      url: 'https://api.ultramsg.com/instance76014/messages/image',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    // Make the Axios request
    const response = await axios(config);

    console.log('WhatsApp message sent:', response.data);
    res.status(200).send('WhatsApp message sent successfully');
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    res.status(500).send('Internal Server Error');
  }
});
