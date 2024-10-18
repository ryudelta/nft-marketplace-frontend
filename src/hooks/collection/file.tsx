import path from "path"
import { generateJson } from "../../tools/generate-json"

const paths = `collections`
const filename = `data.json`

const collectionFile = {
    generate: async (data: any): Promise<any> => {
        console.log(`data genrate => ${data}`);
        
        const generate = await generateJson(paths, filename, data)
        if (!generate) {
            return true
        }
        console.log(`generate => `, generate);
        return generate
    }
}

export { collectionFile }