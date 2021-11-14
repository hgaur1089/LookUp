
const uuid = () => {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 1; i < 10; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        if(i%3 == 0 && i!= 9){
            result += '-';
        }
   }
   return result;
};

module.exports = uuid;