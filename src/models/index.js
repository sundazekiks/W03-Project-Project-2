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

function Organization(org_name, org_type, street_address, city, state, zipCode) {
    return {
        org_name,
        org_type,
        street_address,
        city,
        state,
        zipCode
    }
}

module.exports = { Person, Organization };