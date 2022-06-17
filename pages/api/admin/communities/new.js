// Creates community
export default async function handler(req, res) {
  const body = req.body;
  // console.log(req.session.user.id)
  //console.log(body);

  await prisma.Community.create({
    data: {
      name: body.name,
    },
  });

  res.status(200).send();

}