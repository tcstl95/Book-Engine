const {AuthenticationError} = require('apollo-server-express');
const {User, Book} = require('../models');
const {signToken} = require('../utils/auth');

// Created Resolvoers and Mutations

const resolvers = {
    Query: {
    
        me: async (parent, args, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id}).select ('-__v -password').populate('savedBooks');
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
        saveBook: async (parent, {bookData}, context) => {
            if(context.user){
                const updateUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: bookData}},
                    {new: true}
                );
                return updateUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeBook: async (parent, {bookId}, context) => {
            if(context.user){
                const updateUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {savedBooks: {bookId: bookId}}},
                    {new: true}
                );
                return updateUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
        

}
};
module.exports = resolvers;
