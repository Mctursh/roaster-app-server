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

const generateShifts = (users) => {
    let userstoReturn = users
    let randomUserShift = users[0].shifts
    let dateObj = randomUserShift[randomUserShift.length - 1] && randomUserShift[randomUserShift.length - 1].date || new Date()
    const template0 = [ 'M', 'N', 'O', 'N', 'O', 'M', "M" ]
    const template1 = [ 'M', 'N', 'O', 'M', 'O', 'M', "M" ]
    let startIdx = randomUserShift && randomUserShift.length && 1 || 0
    let endIdx = randomUserShift && randomUserShift.length && 8 || 7
    userstoReturn.forEach(user => {
        let chosenIdx = []
        for (let i = startIdx; i < endIdx; i++) {
        const date = new moment(dateObj).add(i, 'day').toString()
        const templateToUse = Math.round(Math.random())
        let shiftIdx = Math.round(Math.random() * 6)
        while (chosenIdx.includes(shiftIdx)) {
            shiftIdx = Math.round(Math.random() * 6)
        }
        const shift = eval(`template${templateToUse}`)[shiftIdx]
        user.shifts.push({date, shift: shift})
        chosenIdx.push(shiftIdx)
        }
        chosenIdx = []
    })

    return userstoReturn
} 

module.exports = { generateEmail, generatePassword, generateShifts }