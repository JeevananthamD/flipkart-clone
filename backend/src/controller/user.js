const { User, validateUserSignUp, validateUserSignIn } = require("../models/user");
const _ = require("lodash");


async function signUp(req,res) {
    
    const { error } = validateUserSignUp(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email })
    if(user) return res.status(400).send("User is already registered.");

    user = new User(_.pick(req.body, ["firstName", "email", "password"]));
    if(req.body.lastName) user.lastName = req.body.lastName;
    if(req.baseUrl === "/api/admin") user.isAdmin = true;
    await user.save().catch(err => res.status(400).send(err));
    
    res.status(201).send({ message: "User Created Successfully" });

}
 
async function signIn(req,res) {
    
    const { error } = validateUserSignIn(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Invalid email or password.");

    const validPassword = user.authenticate(req.body.password);
    if(!validPassword) return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();

    res.status(200).send({ token, user: _.pick(user,["firstName", "lastName", "email", "isAdmin"])});

}

module.exports = {
    signUp,
    signIn
}