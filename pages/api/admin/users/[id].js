import prisma from "/lib/prisma";

// Gets user by id
export default async function handler(req, res) {

  // TODO
  //  Error handling
  const com = await prisma.User.findUnique({
    where: {
      id: parseInt(req.query.id),

    },
    include: {
        communities: {
            select: {
                id: true,
            }
        }
    }
  });

  //console.log(com)
  return res.status(200).json(com);
}