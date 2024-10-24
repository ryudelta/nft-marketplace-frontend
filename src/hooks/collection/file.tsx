import path from "path"
import { fetchJson, generateJson } from "../../tools/generate-json"
import { Collections } from "./interface"

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
    },
    fetch: async (): Promise<Collections[] | []> => {
        try {
            const response = await fetchJson(paths, filename)
            const colResponse: [Collections] = response
            if (colResponse.length <= 0) {
                return []
            }
            return colResponse
        } catch (error: any) {
            return error
        }
    }
}

export { collectionFile }