const { options } = require("../routes/person.route");

const validate = validations => {
    return async (req, res, next) => {
        // sequential processing, stops running validations chain if one fails.
        for (const validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                return res.status(400).json({ errors: result.array() });
            }
        }

        next();
    };
};

const checks = {
    email: { isEmail: { options: [{ allow_display_name: true }, { allow_ip_domain: true }] } },
    password: {
        isInt: true
    }
}
module.exports = { validate, checks };