const { ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage")
const { firebaseStorage } = require("./config")


const insertFileintoFirbebase = async (fileName, buffer, metadata)=>{
    try {
        const storeageRef = ref(firebaseStorage, fileName)  ;
        const snapshot = await uploadBytesResumable(storeageRef, buffer, metadata);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        return downloadUrl;
    } catch (error) {
        console.log('error while uploading file in firebase', error)
        throw new Error(error)
    }
};
module.exports = {insertFileintoFirbebase}