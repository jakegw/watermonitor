//This endpoint will be called when the system recieves a text message


export default function handler(req, res) {

    if (req.body.length > 160 || !isNaN(req.query.number)) {
        return res.status(400).send({error: 'not a text message'})
    }

    console.log(req.query.number)

    return res.status(200).send("👍")
}