import {withSessionRoute} from "../../lib/session/withSession";

export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {
  //console.log(req.body);

  // If admin user and pass correct then set a session cookie
  if (req.body.user === "admin" && req.body.pass === process.env.ADMIN_PASS) {
    //console.log("Logged in as admin");
    req.session.user = {
      id: 0,
      admin: true,
    };
    await req.session.save();
    return res.status(200).send();
  }
  res.status(400).send({error: "Invalid credentials"});
}