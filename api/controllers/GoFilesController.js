import GoFilesApi from '../bin/GoFilesApi.js';
import FilesModel from '../models/FilesModel.js';
class GoFilesController {
    constructor() {
        
    }

    async list(req, res) {
        // await FilesModel.remove();
        const docs = await FilesModel.find({});
        res.status(200).json(docs);
    }

    async createFolder(req, res) {
        try {
            const rootFolder = GoFilesApi.accountDetail.rootFolder;
            const {folderName} = req.body;
            const response = await GoFilesApi.createFolder(rootFolder, folderName);
            if(response.data.status === 'ok') {
                const file = response.data.data;
                const doc = new FilesModel(file);
                await doc.save();
                res.status(201).json({...response.data, doc});
            }
        } catch(error) {
            res.status(400).json(error);
        }

    }

    async uploadFile(req, res) {
        try {
            const server = await GoFilesApi.getServer();
            const file = req.files.file;
            const { folderName } = req.body;
            const folder = await FilesModel.findOne({'type': 'folder', 'name': folderName});
            if(folder === null){
                return res.status(404).json({message: `Folder ${folderName} not found. Please create a folder with the 'go-files/create-folder' Endpoint.`})
            }
            const response = await GoFilesApi.uploadFile(server, folder.id, file);
            if(response.data.status === 'ok') {
                console.log(response.data.data);
                const doc = new FilesModel({...response.data.data, type: 'file', name: file.name});
                await doc.save();
                return res.status(201).json(doc);
            }
            return res.status(400).json(response);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    async deleteFile(req, res) {
        try{
            const {folderName, fileName} = req.body;
            const docs = await FilesModel.find({'$or':[{type: 'folder', name: folderName}, {type: 'file', name: fileName}]});
            const folders = docs.filter(doc => doc.type === 'folder');
            const files = docs.filter(doc => doc.type === 'file');
            if(!folders.length) {
                return res.status(404).json({message: `Folder ${folderName} not found. Please create a folder with the 'go-files/create-folder' Endpoint.`})
            }
            if(!files.length) {
                return res.status(404).json({message: `File ${fileName} not found. Please create a file with the 'go-files/upload-file' Endpoint.`})
            }
            
            var result = files.filter((file) => {
                return folders.some((folder) => {
                    return folder.id === file.parentFolder;
                });
            })

            if(result.length) {
                let arrItems = [];
                let arrDeletesDB = [];
                result.map(item => {
                    arrItems.push(item.fileId);
                    arrDeletesDB.push(item._id);
                })
                const contentsId = arrItems.join(',');
                const response = await GoFilesApi.deleteFile(contentsId);
                if(response.data.status === 'ok') {
                    await FilesModel.remove({_id : {'$in' : arrDeletesDB}});
                    return res.status(200).json(response.data.data);
                }
            } else {
                return res.status(400).json({message: 'The path given doesn exist, check the name of the folder your file is on.'});
            }
        } catch(error){
            res.status(400).json(error);
        }
    }
}

export default new GoFilesController();