
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

module.exports = { generateEmail, generatePassword }