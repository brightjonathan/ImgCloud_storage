import {useState, useEffect } from 'react'
import { storage, db} from '../Firebase-config'
import { addDoc, collection } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
//import { v4 } from 'uuid'



const SecondHookStorage = (file) => {

    //all state for our img upload
    const [progress, setprogress] = useState(0);
    const [error, setError] = useState(null);
    const [url, seturl] = useState(null);


      

    useEffect(()=>{
 
          //creating a collection in the firestore
          const collectionRef = collection(db, 'ImagesPost');

          const storageRef = ref(storage, "imagesTwo/");

        //const fileRef = ref(storage, `imagesTwo/${file.name + v4()}`)
          const fileRef = ref(storage, `imagesTwo/${file.name}`)


        uploadBytes(fileRef, file).then((snap)=>{
             //calculating our percentage bar
             let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
             setprogress(percentage)
            alert('file uploaded successfully')

            getDownloadURL(snap.ref).then((url)=> {
                seturl(url);
            
                const createdAt = new Date(); //TimeStamped  
                addDoc(collectionRef, {url, createdAt}) //adding the file to the database
            })

        }).catch((err)=>{
            setError(err)
        })

    },[file])

  return { progress , error , url}
}

export default SecondHookStorage
