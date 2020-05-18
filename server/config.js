export default {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://dev:dev678@ecom-cluster0-xjn8d.mongodb.net/test?retryWrites=true&w=majority',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID
}