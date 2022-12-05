import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../helpers/fileUpload";
import { api_key, api_secret, cloud_name } from '../../helpers/variablesDeEntorno';

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret :api_secret,
    secure: true
})

describe('Pruebas en fileUpload', () => {
    
    test('debe de subir el archivo correctamente a cloudinary', async () => {
      
        const imageUrl = 'https://pbs.twimg.com/profile_images/699068042676826112/nrNBtS5c_400x400.jpg';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'image.jpg');


        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

    })

    test('Debe retornar null', async() => {

        const file = new File([], 'image.jpg');
        const url = await fileUpload( file );
        expect( url ).toBe(null);
    })
    
    

});
