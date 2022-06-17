import prisma from "/lib/prisma";

// Deletes a user by id
export default async function handler(req, res) {

  // TODO
  //  Error handling

  const user = await prisma.User.delete({
    where: {
      id: parseInt(req.body.id),
    },
  });


  return res.status(200).json(user);
}