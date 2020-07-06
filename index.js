import express from 'express';
//const express=require('express');
import morgan from 'morgan';
//const morgan=require('morgan');
import cors from 'cors';
//const cors=require('cors');
import path from 'path';
import mongoose from 'mongoose';
import router from './routes';

//Conexión a la base de datos MongoDB
mongoose.Promise=global.Promise;
// const dbUrl = 'mongodb://localhost:27017/dbsistema';
const dbUrl = 'mongodb+srv://testtest:ZQG4kPACWfCiLMVH@purchasing-and-sales-sy.bbhwn.mongodb.net/dbsistema?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {useCreateIndex:true, useNewUrlParser: true})
.then(mongoose => console.log('Conectado a la BD en el puerto 27017'))
.catch(err => console.log(err));


const app=express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')))

app.use('/api',router);
app.set('port',process.env.PORT || 3000);

app.listen(app.get('port'),()=>{
    console.log('server on port ' + app.get('port'));
});