import { useState } from 'react'
import ImageDisplayGrid from './ImageDisplayGrid';
import Model from './Model';
import ProgressBar from './ProgressBar';
import Title from './Title';

const UploadForm = () => {

    const types = ['image/png', 'image/jpeg'];
    const [file, setfile] = useState(null); //state for the file
    const [error, seterror] = useState(null); 

    //State used for the used for the selected images 
    const [selectedImg, setselectedImg] = useState(null)


    //Funct. for the onChange
    const changeHandler = (e)=>{
       let selected = e.target.files[0];

       //
       if (selected &&  types.includes(selected.type)) {
        setfile(selected)
        seterror('')
       }else{
        setfile(null);
        //alert('Please select an image file (png or jpeg)')
        seterror('Please select an image file (png or jpeg)')
       }

    }

  return (
   <>
   <Title/>
    <form>
        <label>
        <input type='file' onChange={changeHandler} />
        <span>+</span>
        </label>
        
        <div className='output'>
           {error && <div className='error'> { error } </div>}
           {file && <div> {file.name}</div>}
           {file && <ProgressBar file={file} setfile={setfile}/>}
        </div>
    </form>
   
   <ImageDisplayGrid setselectedImg={setselectedImg} />

   {/*  */}
   { selectedImg && <Model selectedImg={selectedImg} setselectedImg={setselectedImg}/>}
   </>
  )
}

export default UploadForm


