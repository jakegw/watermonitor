import prisma from "/lib/prisma";

// Deletes a tank by id
export default async function handler(req, res) {

  // TODO
  //  Error handling

  const user = await prisma.Tank.delete({
    where: {
      id: parseInt(req.body.id),
    },
  });


  return res.status(200).json(user);
}