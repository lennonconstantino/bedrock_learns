import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'

const client = new BedrockRuntimeClient({ region: 'us-east-1' })

const fact = "The first moon landing was in 1969."
const animal = "cat"

async function main() {
    const response = await client.send(new InvokeModelCommand({
        body: JSON.stringify({ inputText: fact }),

        //modelId: 'amazon.titan-embed-text-v1',
        modelId: 'amazon.titan-embed-text-v2:0',
        contentType: 'application/json',
        accept: 'application/json',
    }))
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    console.log(responseBody.embedding)
}

main();
