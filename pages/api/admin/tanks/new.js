// TODO
//  Restrict to admin users
//  Verify phone is valid

export default async function handler(req, res) {
  const body = req.body;
  // console.log(req.session.user.id)
  console.log(body);


  await prisma.Tank.create({
    data: {
      name: body.name,
      phone: body.phone,
      capacity: parseInt(body.capacity),
      communities: {
        connect: req.body.communities.map(x => ({'id': parseInt(x)}))
      },
    },
  });

  res.status(200).send();

}