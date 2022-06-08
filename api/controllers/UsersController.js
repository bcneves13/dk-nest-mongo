
import Users from '../models/UsersModel.js';
import LinkAPI from '../bin/LinkApi.js';
import xmlParser  from "../bin/xmlParser.js";
import csvPareser from '../bin/csvParser.js'; 
import cron from 'node-cron';

class UsersController {
    
    async list(req, res) {
        // await Users.deleteMany({});
        const docs = await Users.find({});
        return res.status(200).json(docs);
    }

    async cron(req, res) {
        const pageLimit = {
            page: 1,
            limit: 10
        }
        let unsersInserted = []
        const job = cron.schedule('*/1 * * * *', async() => { //TODO: Definir agendamento de chamada 
            try {
                console.log({pageLimit})
                const usersList = await LinkAPI.getUsers(pageLimit);
                const jsonList = xmlParser(usersList.data);
                for(let user of jsonList) {
                    let userDoc = {
                        fullName: `${user.firstName[0]} ${user.lastName[0]}`,
                        email: user.email[0]
                    }
                    const userAddress = await LinkAPI.getAddresses(user.id[0]);
                    const userContact = await LinkAPI.getContacts(user.id[0]);
                    const resAddress = xmlParser(userAddress.data);
                    const resContact = xmlParser(userContact.data);
                    if(!resAddress) {
                        console.log(user.id)
                        console.log(userAddress.data);
                    }
                    userDoc['address'] = resAddress.street[0];
                    userDoc['addressNumber'] = resAddress.number[0]._;
                    userDoc['phoneNumber'] = resContact.phoneNumber[0];
                    unsersInserted.push(userDoc);
                    await new Users(userDoc).save();
                }
                
                pageLimit.page += 1;
            } catch(error) {
                return res.status(500).json({message: 'Error on requests',error});
            }
        });
        
        return res.status(200).json({message: 'Automation started'});
    }

    async exportFiles(req, res) {
        try {
            const docs = await Users.find({});
            const created = csvPareser.jsonToFile(docs);
            if(created) {
                res.status(200).json({message: 'Report created in Users Report folder'});
            } else {
                res.status(500).json({message: 'Error creating user report file'});
            }
        } catch(error) {
            res.status(500).json({error, message: 'Something went wrong creating the report'});
        }
    }
}

export default new UsersController();