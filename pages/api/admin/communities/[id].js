import prisma from "/lib/prisma";

// Gets community by id
// If id is 'all', returns all communities
export default async function handler(req, res) {
  //console.log("ok")
  // TODO
  //  Error handling
  let com
  if (req.query.id === 'all') {
    com = await prisma.Community.findMany();
  } else {
    com = await prisma.Community.findUnique({
      where: {
        id: parseInt(req.query.id),
      },
    });

  }


  return res.status(200).json(com);
}