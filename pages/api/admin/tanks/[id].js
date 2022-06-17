import prisma from "/lib/prisma";

// Gets tanks by id and includes the community relationship
// If id is 'all', returns all tanks
export default async function handler(req, res) {
  //console.log("ok")
  // TODO
  //  Error handling
  let com
  if (req.query.id === 'all') {
    com = await prisma.Tank.findMany({
        include: {
            communities: true,
        }
    });
  } else {
    com = await prisma.Tank.findUnique({
      where: {
        id: parseInt(req.query.id),
      },
      include: {
        communities: true,
      }
    });

  }


  return res.status(200).json(com);
}