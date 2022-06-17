// TODO
//  Verify phone is valid

// Creates a new users
export default async function handler(req, res) {
  const body = req.body;
  // console.log(req.session.user.id)
  // console.log(body);

  await prisma.User.create({
    data: {
      name: body.name,
      phone: body.phone,
      communities: {
        connect: req.body.communities.map(x => ({'id': parseInt(x)}))
      }
    },
  });

  res.status(200).send();

}