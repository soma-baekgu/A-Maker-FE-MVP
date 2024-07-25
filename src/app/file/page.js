"use client"
import {useEffect, useState} from "react";
import fileApi from '../api/file';
import axios from "axios";
import chatApi from "amaker/app/api/chat";

export default function Page() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [savePath, setSavePath] = useState(null)

  useEffect(() => {
    if (!selectedFile) return

    const getSavePath = async (filename, extension) => {
      let res = await fileApi.getSavePath(new Date().toISOString(), extension, filename);
      setSavePath(res.data.data)
    }

    const fileName = selectedFile.name;
    const baseName = fileName.substring(0, fileName.lastIndexOf('.'));
    const extension = fileName.split('.').pop()
    getSavePath(baseName, extension)

  }, [selectedFile])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    const res = await axios.put(savePath, selectedFile, {
      headers: {
        'Content-Type': 'application/octet-stream',
      }
    })

    const removeQueryString = (presignedUrl) => {
      const url = new URL(presignedUrl);
      url.search = '';
      url.hash = '';
      return url.toString();
    }

    console.log(res)

    chatApi.fileChat(1, removeQueryString(savePath))
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange}/>
      {savePath && (
        <button onClick={uploadFile}>Upload File</button>
      )}
    </div>
  );
}
