//------------------creating the env varibales in .env file(must be in root folder)-------------------
//fill values from BAAS service API

VITE_APPWRITE_URL=""
VITE_APPWRITE_PROJECT_ID=""
VITE_APPWRITE_DATABASE_ID=""
VITE_APPWRITE_COLLECTION_ID=""
VITE_APPWRITE_BUCKET_ID=""


//---------------------------- now in config.js file (must make a config folder for that separate) --------------------------
//here writing all the environment variable accessing so that we don't write whole access line again and again in our project
// for eg- now to access appwriteUrl we dont have to write whole line, we simple now can access using the key(appwriteUrl, appwriteProjectId etc.).
//using String function becoz we are specifying that env varibale values must be in string format
//here import.meta.env.<> is format to access the env variable in VITE project

const config={
    appwriteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}
export default config



//---------------------------------------------------------------------------------------------------------------------
// -------------- now the main authentication file (auth.js), must be in a separate folder naming your BAAS app-----------

import conf from '../conf/conf.js'; //importing the env varibale from config file. ( used in constructor for creating clients)
import { Client, Account, ID } from "appwrite"; //importing functions from appwrite library

//we make class, so that on creating object of it, we can easily access every function of it with .(dot) operator
//we make class, becoz making generic code, so that for any other BAAS services, we can simply change the main functions
export class AuthService {

    client = new Client(); // creating client, the very first step
    account; // account creation ke liye, becoz we access every services only by this, i.e account.create(), account.logout() etc...

    //now this will be created automatically for every object, that is we create client and account for an object.
    //in this we defined the property for client as mentioned in the appwrite docs.s
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    //here creating function so that for different BAAS we can simply change the required lines in function only
    //creating different services for our BAAS library, i.e creatrAccount(), login(), getCurrentUser(), logout() features for our app
    //and every function can have some error hence creating try and catch in every function
    //using async and await for every function becoz it must run only after the client and acoount created in constructor

    //passing some props in createAccount, i.e when we call it, we must pass these
    async createAccount({email, password, name}) {
        //every function can have some error hence creating try and catch in every function
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name); //1st paramtere must be ID else not work
            if (userAccount) {
                // if account created then directly make user login hence calling login directly withour making user to login manually again
                return this.login({email, password});
                //we can also redirect to login page if want, uska implementation is different.
            } else {
               return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    //to check if you are already logged in or not.
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null; //if error aaye then ye return ho
    }

    //logout is termed as deleteSession in appwrite
    async logout() {

        try {
            await this.account.deleteSessions(); // here Sessions() hai becoz we want user to logunt from every system(mobile, website) for this website.
            //if writing Session() then it will remove only from the current system(either mobile or web) website.
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

//created object for the class, and exporting our object, as all the functions are directly linked with the object.( becoz they are defined in class)
const authService = new AuthService();

export default authService