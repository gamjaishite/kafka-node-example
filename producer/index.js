import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'myApp',
    brokers: ['localhost:9092', 'localhost:9092']
})

const producer = kafka.producer()

export const run = async () => {
    await producer.connect();
    // const quotes = await fetch('https://zenquotes.io/api/random').then(r => r.json());
    await producer.send({
        topic: 'quote',
        messages: [
            { key: 'a', value: 'hhh', partition: 0},
            { key: 'b', value: 'jjjj', partition: 1},
        ],
    })
    console.log('Message sent successfully 🤯');
}

setInterval(run, 500);