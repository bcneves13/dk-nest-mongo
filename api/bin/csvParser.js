import {Parser} from 'json2csv';
import fs from 'fs';
import path from 'path';

const csvParser = {
    jsonToFile(json) {
        let fields = Object.keys(json[0]._doc);
        fields.pop()
        const opts = { fields };
        const parser = new Parser(opts);
        const csv = parser.parse(json);
        const filename = new Date().toDateString();
        var createdFile = true;
        fs.writeFile(`api/Users Report/${filename}.csv`, csv, (err) => {
            if(err) {
                console.log(err);
                createdFile = false;
            }
            console.log('report created')
        })
        return createdFile;
    }
}
export default csvParser;