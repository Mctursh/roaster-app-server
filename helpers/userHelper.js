const moment = require("moment");
const generateEmail = (firstName, lastName) => {
    let fname = firstName.toLowerCase()
    let lname = lastName.toLowerCase()
    return `${fname}.${lname}@ubth.edu.ng`
}

const generatePassword = () => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
            'abcdefghijklmnopqrstuvwxyz0123456789@#$';
        
    for (let i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random()
                    * str.length + 1);
            
        pass += str.charAt(char)
    }
        
    return pass;
}

const generateShifts = async (users) => {
    let userstoReturn = users
    try {
        for (let k = 0; k < userstoReturn.length; k++) {
            const userShifts = userstoReturn[k].shifts
            console.log(userShifts);
            if (userShifts.length > 0) {
                const lastShiftDay = userShifts[userShifts.length - 1].date
                let dateObj = moment(lastShiftDay).startOf('week').add(7, 'days')
                const template = [ 'M', 'N', 'M', 'N', 'O', 'M', "M" ]
                const selectedShiftIndex = []
                for (let i = 0; i < 7; i++) {
                    let shiftIdx = Math.round(Math.random() * 6)
                    const date = moment(dateObj).add(i, 'day').toString()
                    while (selectedShiftIndex.includes(shiftIdx)) {
                        shiftIdx = Math.round(Math.random() * 6)
                    }
                    selectedShiftIndex.push(shiftIdx)
                    let shift = `${template[shiftIdx]}`
                    let shiftData = {
                        date,
                        shift
                    }
                    userstoReturn[k].shifts = [...userstoReturn[k].shifts, shiftData]
                }
            } else {
                let dateObj = moment().startOf('week')
                const template = [ 'M', 'N', 'M', 'N', 'O', 'M', "M" ]
                let selectedShiftIndex = []
                for (let j = 0; j < 7; j++) {
                    //generate a random number btw 0 and 6
                    let shiftIdx = Math.round(Math.random() * 6) 
                    const date = moment(dateObj).add(j, 'day').format()
                    
                    // repeats until it finds a unique index that hasn't already been choosen
                    while (selectedShiftIndex.includes(shiftIdx)) {
                        shiftIdx = Math.round(Math.random() * 6)
                    }
                    selectedShiftIndex.push(shiftIdx)
                    let shift = `${template[shiftIdx]}`
                    let shiftData = {
                        date,
                        shift
                    }
                    // userstoReturn[k].shifts.push(shiftData)
                    userstoReturn[k].shifts = [...userstoReturn[k].shifts, shiftData]
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
    return userstoReturn
} 

module.exports = { generateEmail, generatePassword, generateShifts }