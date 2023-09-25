import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'myApp',
    brokers: ['localhost:9092', 'localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'g1' })

export const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'quote', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString()
            })
        }
    })
}


run();