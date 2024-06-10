//unused because there is no  big create card feature
//however we can use this to edit the existing links

import {useState} from 'react'
function CreateLink() {

    const [normalLink, setNormalLink] = useState("");
    const [picture, setPicture] = useState("")
    const [file, setFile] = useState(undefined); 


    const createLink = async(e) => {
        e.prevetDefault();
    }


    return (
        <div className='mt-3 '>
            <div className='w-1/2 bg-white p-3'>
                
                <div className='mt-5'>
                    <label>Link</label>
                    <input  type="text" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="Link"  value = {normalLink} onChange = {(e) => {setNormalLink(e.target.value)}}/>
                </div>

                <div className='mt-5'>
                    <label>Link ismi (İsteğe bağlı)</label>
                    <input  type="text" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="Link ismi (İsteğe bağlı)" />
                </div>

                <div className='mt-5'>
                    <label>Etiketler (İsteğe bağlı)</label>
                    <input  type="text" class="bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="Etiketler (İsteğe bağlı)"  />
                </div>

                
                <div className='mt-5'>
                    <div>
                        <label>Resim</label>
                    </div>
                    <div className='flex justify-between items-center'>
                        <input  type="text" class="bg-gray-100 appearance-none border rounded w-2/5 py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="Resim Linki"   value = {picture} onChange = {(e) => {setPicture(e.target.value)}} />
                        <p>Or</p>
                        <input  type="file" class="bg-gray-100 appearance-none border rounded w-2/5 py-2 px-3 text-gray-700  focus:shadow-outline" id="Password" placeholder="Resim Linki" onChange = {(e) => setFile(e.target.files[0])}  />
                    </div>
                </div>

                <div className='mt-5'>
                    <button className='btn bg-blue-500 w-full' onClick = {() => {createLink()}}>Oluştur</button>
                </div>


            </div>  
        </div>
    )
}

export default CreateLink