
const jwt = require('jsonwebtoken')
module.exports = function generateToken(user){
const token = jwt.sign({id:user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin
}, process.env.JWT_SECRET || 'somethingsecret',
{
    expiresIn:'30d',
}
);

return token;
};

