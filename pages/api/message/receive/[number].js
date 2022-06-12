//This endpoint will be called when the system receives a text message
import prisma from "/lib/prisma";
import isPhoneNum from "/lib/util/isPhoneNum";


export default async function handler(req, res) {

  if (req.body.length > 160 || !isPhoneNum(req.query.number)) {
    return res.status(400).send({error: "not a text message"});
  }

  const message = req.body;
  const origin = req.query.number;
  console.log(origin + ":", message);


  // TODO
  //  Process messages here

  // If comes from a datasource then add to db
  const source = await prisma.DataSource.findMany({
    where: {
      phone: origin,
    },
  });
  const user = await prisma.User.findMany({
    where: {
      phone: origin,
    },
  });


  console.log(source.length);
  console.log(user.length);

  return res.status(200).send("👍");
}