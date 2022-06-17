import prisma from "/lib/prisma";

// Updates an existing tank
export default async function handler(req, res) {

  // TODO
  //  Error handling

  // console.log(req.body.communities)
  const com = await prisma.Tank.update({
    where: {
      id: parseInt(req.body.id),
    },
    data: {
      name: req.body.name,
      phone: req.body.phone,
      capacity: parseInt(req.body.capacity),
      communities: {
        set: req.body.communities.map(x => ({'id': parseInt(x)}))

      }
    },
  });
  return res.status(200).json(com);
}