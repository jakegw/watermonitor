import prisma from "/lib/prisma";


export default async function handler(req, res) {

  // TODO
  //  Error handling

  console.log(req.body)
  const com = await prisma.User.update({
    where: {
      id: parseInt(req.body.id),
    },
    data: {
      name: req.body.name,
      phone: req.body.phone,
    },
  });
  return res.status(200).json(com);
}