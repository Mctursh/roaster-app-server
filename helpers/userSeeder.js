const { User } = require("../models/userModel")
const handlePromise = require("./errorHandler")

const createUser = async(firstName, lastName, email, password, role = 'User') => {
    let newUser = {
        firstName,
        lastName,
        email,
        password,
        role
    }
    const [_,foundData] = await handlePromise(User.find({ email }))
    if(foundData.length){
        return [false, {}, 'User with the details already exist' ]
    } else {
        const [createUserStatus, userStatusData] = await handlePromise(User.create(newUser))   
        console.log(userStatusData);
        if(createUserStatus) {
            return [createUserStatus, userStatusData, `Successfully created ${role}`]
        } else {
            return [createUserStatus, userStatusData, 'Failed to create user']
        }
    }
}

const createAdmin = async() => {
    const  firstName = 'princewill',
        lastName = 'emof',
        email = 'princewill@emof.ubth.edu.ng',
        password = '$wyM0Hm8',
        role = 'Admin'
    
    return await createUser(firstName, lastName, email, password, role)
}

const findUser = async(email) => {
    const [status, data] = await handlePromise(User.find({email}))
    if (status && data.length){
        return [status, data, 'Successfully found User']
    } else {
        return [status, data, 'User not found']
    }
}

module.exports = { createUser, createAdmin, findUser }