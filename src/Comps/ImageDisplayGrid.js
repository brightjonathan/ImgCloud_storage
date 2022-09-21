import {useState, useEffect} from 'react'
import { getDocs, collection } from 'firebase/firestore' 
import { db } from '../Firebase-config' 
import { motion } from 'framer-motion'


const ImageDisplayGrid = ({ setselectedImg }) => {

    const [allFiles, setallFile] = useState([]);

    //creating a collection in the firestore
    const collectionRef = collection(db, 'ImagesPost')

    useEffect(()=>{
        const getFiles = async () =>{
            const data = await getDocs(collectionRef);
            setallFile(data.docs.map((docs)=>({...docs.data(), id: docs.id})));
            //console.log(data.docs.map((docs)=>({...docs.data(), id: docs.id})));
        }

        getFiles()
    }, [])

  return (
    <div className='img-grid'>
      {allFiles && allFiles.map((doc) => (
        <motion.div key={doc.id} className='img-wrap' onClick={()=> setselectedImg(doc.url)} whileHover={{opacity: 1}} layout >
         <motion.img src={doc.url} alt='uploaded images' initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 1}} />
        </motion.div>
        
      ))}

    </div>
  )
}

export default ImageDisplayGrid


