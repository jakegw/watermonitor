import {withSessionRoute} from "../../lib/session/withSession";

export default withSessionRoute(logoutRoute);

// Destroys the session cookie
async function logoutRoute(req, res) {
  req.session.destroy();
  res.redirect("/");
}