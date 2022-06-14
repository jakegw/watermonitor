//This endpoint will be called when the system receives a text message

// Message Structure:
//

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
  const source = await prisma.Tank.findMany({
    where: {
      phone: origin,
    },
  });
  const user = await prisma.User.findMany({
    where: {
      phone: origin,
    },
  });

  if (source.length === 0 && user.length === 0) {
    console.log("👎");
    return res.status(400).send("Unknown source");
  }

  if (source.length > 0) {
    console.log("👍");
    let data = req.body.split(" ");
    await prisma.Measurement.create({
      data: {
        time: new Date(data[0]),
        volume: parseInt(data[1]),
        Tank: {
            connect: {
                id: source[0].id
            }
        }
      },
    });
  }


  console.log(source.length);
  console.log(user.length);

  return res.status(200).send("👍");
}