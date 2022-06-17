import isPhoneNum from "/lib/util/isPhoneNum";


// Placeholder function for sending a message to a number
// Should be replaced with a real SMS API in the future
export default function handler(req, res) {

  if (req.body.length > 160 || !isPhoneNum(req.query.number)) {
    return res.status(400).send({error: "not a text message"});
  }

  const message = req.body;
  const recipient = req.query.number;
  console.log(recipient + ":", message);


  return res.status(200).send("Sent message to: " + recipient);
}