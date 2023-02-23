const {AuthenticationError} = require('apollo-server-express');
const {User, Book} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
          return User.find().populate('savedBooks');
        },
        user: async (parent, {username}) => {
            return User.findOne({username}).populate('savedBooks');
            },
        me: async (parent, args, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id}).populate('savedBooks');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },
        login: async (parent, {email, password}) => {
            if(!email || !password){
                throw new AuthenticationError('You need to provide an email and password!');
            }
            const correctPw= await user.isCorrectPassword(password);
            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return {token, user};
        },

}
}
