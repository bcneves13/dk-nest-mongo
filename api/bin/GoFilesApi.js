import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
const goFileAPI = axios.create({
    baseURL: process.env.GOFILE_API
});
var accountDetails;
const getAccountDetails = async() => {
    try {
        let accountDetails = await goFileAPI.get('getAccountDetails', {params:{token:process.env.GOFILE_TOKEN, allDetails: true}})
        return accountDetails.data.data;
    } catch(error) {
        console.log({error});
        console.log(error.response.data);
        return false;
    }
}
const GoFilesApi = {
    accountDetail: await getAccountDetails(),
    async getServer() {
        try {
            let getServer = await goFileAPI.get('getServer');
            return getServer.data.data.server;
        } catch(error) {
            return {error, message: 'error getting server', statusCode: 500};
        }
    },
    async createFolder(parentFolderId, folderName)  {
        try {
            console.log(accountDetails);
            let createFolder = await goFileAPI.put('createFolder', {parentFolderId, folderName, token:process.env.GOFILE_TOKEN})
            return createFolder;
        } catch(error) {
            return error;
        }
    },
    async uploadFile(server, folderId, file) {
        try {
            const FileStream = fs.createReadStream(file.tempFilePath+file.name);
            let formData = new FormData();
            formData.append('file', FileStream );
            formData.append('token', process.env.GOFILE_TOKEN );
            formData.append('folderId', folderId );
            goFileAPI.defaults.baseURL = goFileAPI.defaults.baseURL.replace('api', server);
            const uploadFile = await goFileAPI.post('uploadFile', formData, {
                headers: {
                    ...formData.getHeaders()
                }
            });
            return uploadFile;
        } catch(error) {
            return error;
        }
    },
    async getContentDetails(contentId) {
        try {
            const contentDetails = await goFileAPI.get('getContent', {data: {contentId, token:process.env.GOFILE_TOKEN}})
            return contentDetails;
        } catch(error) {
            return error;
        }
    },
    async deleteFile(contentsId) {
        try {
            const deleteContent = await goFileAPI.delete('deleteContent', {
                data: {contentsId, token: process.env.GOFILE_TOKEN}
            })
            console.log({deleteContent});
            return deleteContent;
        } catch(error) {
            return error;
        }
    }
}

export default GoFilesApi;