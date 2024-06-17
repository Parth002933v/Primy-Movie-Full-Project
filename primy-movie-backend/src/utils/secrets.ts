import {
    SSMClient,
    GetParameterCommand,
    PutParameterCommand,
} from "@aws-sdk/client-ssm";

export async function getSSMParam({ name }: { name: string }) {
    const SSM_PARAM = name

    const client = new SSMClient({ region: `ap-south-1` })

    const command = new GetParameterCommand({
        Name: SSM_PARAM,
        WithDecryption: true
    })

    const result = await client.send(command)


    return result.Parameter!.Value
}


