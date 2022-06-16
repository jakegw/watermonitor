import prisma from "/lib/prisma";


export default async function handler(req, res) {

  // TODO
  //  Error handling

  // console.log(req.body.communities)
  let v = req.body.communities
  v = v.map(x => ({'id': parseInt(x)}))
  //console.log(v)
  const com = await prisma.User.update({
    where: {
      id: parseInt(req.body.id),
    },
    data: {
      name: req.body.name,
      phone: req.body.phone,
      communities: {
        set: req.body.communities.map(x => ({'id': parseInt(x)}))
      }
    },
  });
  return res.status(200).json(com);
}