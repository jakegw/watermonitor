import prisma from "/lib/prisma";


export default async function handler(req, res) {

  // TODO
  //  Error handling

  const com = await prisma.Community.update({
    where: {
      id: parseInt(req.body.id),
    },
    data: {
      name: req.body.name,
    },
  });


  return res.status(200).json(com);
}