import mongoose from 'mongoose'

export async function db_connect(){
    return mongoose.connect(('mongodb+srv://App_Autoequip:Autoequip94@cluster0.kjbyh.mongodb.net/mern_app?retryWrites=true&w=majority'), {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}