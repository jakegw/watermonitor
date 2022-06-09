import {withSessionRoute} from "../../lib/session/withSession";

export default withSessionRoute(logoutRoute)

async function logoutRoute(req, res) {
    req.session.destroy();
    res.redirect("/");
}