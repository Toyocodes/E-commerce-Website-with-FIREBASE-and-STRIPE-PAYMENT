import React,{useState, useEffect} from 'react'
import { collection, doc, getDoc, setDoc, addDoc, serverTimestamp } from "firebase/firestore"; 
import { storage, db } from '../Config/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom'

const AddProducts = () => {
    // const [title, setTitle]=useState('');
    // const [description, setDescription]=useState('');
    // const [price, setPrice]=useState('');
    // const [image, setImage]=useState(null);
    const navigate = useNavigate();

    //error messages state
    const [imageError, setImageError]=useState('');
    const [successMsg, setSuccessMsg]=useState('');
    const [uploadError, setUploadError]=useState('');

    const [percent, setPercent] = useState(null) //this is not compulsory tho

    // const types =['image/jpg','image/jpeg','image/png','image/PNG'];

    const [file, setFile] = useState("")

    const [data, setData] = useState({
      title: '',
      description: '',
      price: '',
      
    });

    const handleInputChange = (e) => {
      const id = e.target.id;
      const value = e.target.value;
      setData({ ...data, [id]: value });
    };
    console.log(data)

    //to send image to firebase and store it there
    useEffect(() => {
      const uploadFile = () =>{
        const name = new Date().getTime() + file.name //this will create a new timestamp
        const storageRef = ref(storage, file.name);

        // const storageRef = ref(storage, 'product-images');  
        // const fileRef = ref(storageRef, name)
        // const uploadTask = uploadBytesResumable(fileRef, file);

        // const metadata = {
        //   contentType: file.type,
        // };

        const uploadTask = uploadBytesResumable(storageRef, file);


        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setPercent(progress)
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
                default:
                  break;
            }
          }, 
          (error) => {
            console.log(error)
          }, 
          () => {
            
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setData((prev) => ({ ...prev, img: downloadURL }));
            });
          }
        );
        
      }
      file && uploadFile();
    }, [file])


    //to send data input to firebase step 1
    const handleAddProducts = async (e) => {
      e.preventDefault();
    
      try {
        // Adding a new contact
        const docRef = await addDoc(collection(db, "Products"), {
          ...data,
          timeStamp: serverTimestamp(),
        });
       
        toast.success('Product Added Successfully');
        navigate('/');
      } catch (err) {
        console.error('Error:', err);
        toast.error(err.message);
        setImageError('Please Choose a File');

      }
    };
   
    

   
  return (
    <div className='px-[6%] mt-[150px] md:mt-[15%]'>
        <form autoComplete="off" className="" onSubmit={handleAddProducts}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Product Title</label>
            <input
              type="text"
              id="title"
              className="form-input w-full px-3 py-2 border rounded-md"
              required
              onChange={handleInputChange}
              value={data.title}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Product Description</label>
            <input
              type="text"
              id="description"
              className="form-input w-full px-3 py-2 border rounded-md"
              required
              onChange={handleInputChange}
              value={data.description}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Product Price</label>
            <input
              type="string"
              id="price"
              className="form-input w-full px-3 py-2 border rounded-md"
              required
              onChange={handleInputChange}
              value={data.price}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Product Image</label>
            <input
              type="file"
              id="file"
              className="form-input w-full px-3 py-2 border rounded-md"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
            {imageError && (
              <div className="mt-2 text-red-500 text-sm">{imageError}</div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              SUBMIT
            </button>
          </div>
        </form>
    </div>
  )
}

export default AddProducts