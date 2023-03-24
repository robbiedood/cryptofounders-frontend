import axios from 'axios';
import { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { API_UPLOAD_HEADSHOT } from '../constants/APIs';
import { useAppDispatch } from '../redux/hooks'
import { setFounderProfile } from '../redux/founderProfileSlice';

interface HeadshotProps {
  headshotUrl: string;
  generatingSeed: string | null;
}

export const HeadshotEditable = ({headshotUrl, generatingSeed}:HeadshotProps) => {
  const imageUrl = headshotUrl || `https://robohash.org/${generatingSeed}?size=128x128`;
  const founderAccountAddress = generatingSeed;
  const dispatch = useAppDispatch();
  const [image, setImage] = useState(imageUrl);
  // If headshotUrl is not provided, use robohash; generatingSeed is founderAddress
  // For "founder", the backend (should) already provided a default headshot using robohas. 

  const handleEdit = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event:any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        const buffer = new Uint8Array(reader.result as ArrayBuffer);
        const blob = new Blob([buffer], { type: 'image/jpg' });
        uploadImageToServer(blob as any);
        const objectURL = URL.createObjectURL(blob);
        setImage(objectURL);
      };
    };
    input.click();
  };

  const uploadImageToServer = async (blob:string) => {
    const formData = new FormData();
    formData.append('image', blob, `${founderAccountAddress}.jpg`);
    try {
      const res = await axios.post(API_UPLOAD_HEADSHOT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      const headshot = res.data;
      dispatch(setFounderProfile({contact: headshot}));

    } catch (err:any) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  }

  return (
    <div className='flex ml-4 mt-2 items-end'>
      <img className='w-32 h-32 rounded-full' src={image} alt="Headshot"
        onClick={handleEdit}
          />
        <FaPencilAlt
          className="cursor-pointer -ml-6"
          color='gray'
          onClick={handleEdit}
        />
    </div>
  ) 
}

export const HeadshotMini = ({headshotUrl}:any) => {
  // For "founder", the backend (should) already provided a default headshot using robohas. 
return (
    <img className='w-16 h-16 rounded-full' src={headshotUrl} alt="HeadshotForNav"/>
  ) 
}



export const Headshot = ({headshotUrl, generatingSeed}:HeadshotProps) => {
    // If headshotUrl is not provided, use robohash; generatingSeed: if founderName is not provided, use founderAddress
  const imageUrl = headshotUrl || `https://robohash.org/${generatingSeed}?size=128x128`;
  return (
    <div className='ml-4 mt-2'>
      <img className='w-32 rounded-full' src={imageUrl} alt="Headshot"/>
    </div>
  ) 
}

export const HolderHeadshot = ({headshotUrl, generatingSeed}:HeadshotProps) => {
    // If headshotUrl is not provided, use robohash; generatingSeed: if founderName is not provided, use founderAddress
    const imageUrl = headshotUrl || `https://robohash.org/${generatingSeed}?size=128x128`;
    return (
      <div className='ml-4 mt-2'>
        <img className='w-16 rounded-full' src={imageUrl} alt="Headshot"/>
      </div>
    ) 
} 