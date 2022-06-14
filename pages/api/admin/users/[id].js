import prisma from "/lib/prisma";


export default async function handler(req, res) {

  // TODO
  //  Error handling
  const com = await prisma.User.findUnique({
    where: {
      id: parseInt(req.query.id),
    },
  });


  return res.status(200).json(com);
}