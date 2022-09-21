import {useState, useEffect } from 'react'
import { storage } from '../Firebase-config'
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

const Upload = () => {

    const [fileUpload, setfileUpload] = useState(null); //useState targeting the file
    const [fileUrls, setfileUrls] = useState([]);       //state for the url
  
    //created a folder in the database
    const fileListRef = ref(storage, "images/");
    
    //btn functionality
    const uploadFile = () => {
      //if no file is selected return nothing
      if (fileUpload == null) return;
      const fileRef = ref(storage, `images/${fileUpload.name + v4()}`);  //creating a unique id for each file

     
      uploadBytes(fileRef, fileUpload).then((snapshot) => {
        alert('file uploaded')

         //funct. to refresh the browser after upload
        getDownloadURL(snapshot.ref).then((url) => {
          setfileUrls((prev) => [...prev, url]);
        });
      });

    };

    //fetching the data url and displaying them in the browser
    useEffect(() => {
      listAll(fileListRef).then((response) => {
        response.items.map((item) => {
          getDownloadURL(item).then((url) => {
            setfileUrls((prev) => [...prev, url]);
          });
        });
      });
    }, []);


  return (
    <div>
      <input type='file' onChange={(e)=> { setfileUpload(e.target.files[0])}} />
      <button onClick={uploadFile}> Upload </button>

      {fileUrls.map((url, index)=> (
        <div key={index} >
            {/* <img src={url} /> */}
            <video width="320" height="240" src={url} controls />
    
        </div>
      ))}
    </div>
  )
}

export default Upload

