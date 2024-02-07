export const sendTicketToWhatsapp = async (imageURL: string, phoneNumber: string) => {
  var data =
    "token=3pbxjpnq0pvlxr45&to=%2B591" + 
    encodeURIComponent(phoneNumber)
     +"&image=" +
    encodeURIComponent(imageURL) +
    "&caption=";

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://api.ultramsg.com/instance76014/messages/image");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(data);
};
