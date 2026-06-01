// Person

function Person({ firstName, lastName, birthDate, sex, street_address, city, state, zipCode }) {
    return {
        firstName,
        lastName,
        birthDate,
        sex,
        street_address,
        city,
        state,
        zipCode
    }
}

function Family({ familyName, members }) {
    return {
        familyName,
        members
    }
}
module.exports = { Person, Family };