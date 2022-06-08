import { parseString } from "xml2js";

const xmlParser = (xmlString) => {
    var parsed;
    parseString(xmlString, (err, result) => {
        if(err) {
            return err;
        }
        if('usersList' in result.data) {
            parsed = result.data.usersList[0].item;
        } else {
            parsed = result.data.item[0];
        }
        // console.log('PARSER', result.data)
    })
    return parsed;
}

export default xmlParser;