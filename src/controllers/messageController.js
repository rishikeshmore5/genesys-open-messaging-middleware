import { sendMessage } from "../services/messageService.js";

export async function postMessage(req, res) {

    try {

        const message = {
    customerId: req.body.customerId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    text: req.body.text
};
        const response = await sendMessage(message);

        res.json({
            success: true,
            data: response
        });

    } catch (err) {

        console.error(err.response?.data || err.message);

        res.status(500).json({

            success: false,

            error: err.response?.data || err.message

        });

    }

}