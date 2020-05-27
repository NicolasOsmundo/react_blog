import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


    let firebaseConfig = {
        apiKey: "AIzaSyDvbwqqrmmJxbNO5lenloag_zWVegCvkjw",
        authDomain: "reactapp-ea17c.firebaseapp.com",
        databaseURL: "https://reactapp-ea17c.firebaseio.com",
        projectId: "reactapp-ea17c",
        storageBucket: "reactapp-ea17c.appspot.com",
        messagingSenderId: "969247893601",
        appId: "1:969247893601:web:44d055385903aa0d99e220",
        measurementId: "G-TZZ43MBBCP"
    };

class Firebase{
    constructor(){
        app.initializeApp(firebaseConfig);

        // referenciando a database para acessar em outros locais
        this.app = app.database();

        this.storage = app.storage();
    }

    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    logout(){
        return app.auth().signOut();
    }

    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password)

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome 
        })
            
    }

    isInitialized(){
        return new Promise(resolve =>{
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null;
        }
        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid)
        .once('value').then(callback);
    }
}

export default new Firebase();