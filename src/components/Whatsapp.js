import React from "react";
import WhatsAppWidget from "react-whatsapp-widget";
import "react-whatsapp-widget/dist/index.css";
const Whatsapp = () => {
  return (
    <WhatsAppWidget
      phoneNumber="+923000736431"
      companyName="Mashreq School System"
      message="-السلام عليكم ورحمة الله وبركاته! الله تعالی آپ سے راضی ھو!"
    />
  );
};

export default Whatsapp;
