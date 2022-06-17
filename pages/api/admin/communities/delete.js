import prisma from "/lib/prisma";

// Deletes community by id
export default async function handler(req, res) {

  // TODO
  //  Error handling

  const com = await prisma.Community.delete({
    where: {
      id: parseInt(req.body.id),
    },
  });


  return res.status(200).json(com);
}