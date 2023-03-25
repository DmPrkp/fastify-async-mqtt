# fastify-async-mqtt

<!-- ![CI](https://github.com/fastify/fastify-mongodb/workflows/CI/badge.svg) -->
<!-- [![NPM version](https://img.shields.io/npm/v/@fastify/mongodb.svg?style=flat)](https://www.npmjs.com/package/@fastify/mongodb) -->
<!-- [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://standardjs.com/) -->

Fastify Async Mqtt is wrapper over [async-mqtt](https://www.npmjs.com/package/async-mqtt) with TypeScript support.

## Install

```
npm i fastify-async-mqtt
```

## Usage
Add it to your project with `register` and you are done!  

```ts
import fastify from 'fastify'
import { fastifyMQTT } from './mqtt-module'

const server = fastify()

// register plugin 
server.register(fastifyMQTT, { url: 'mqtt://localhost:1883' })

server.register(async function (instance) { 
    if (!instance.mqttClient) return
    await instance.mqttClient.publish("hello/world", "Hi Mosquitto");
  })

server.listen({ port: 3000, host: '0.0.0.0' }, err => {
  if (err) throw err
})
```
or usage on request

```ts
// another type of register
server.register(fastifyMQTT, { 
        opts: {host: 'mosquitto', port: 1883, protocol: 'mqtt'}, 
        allowRetries: false 
    })

server.get('/ping/mqtt', async function (req, reply) {
    await this.mqttClient.publish("hello/world", "Hi Mosquitto");
    reply.send({mqtt: 'pinged'})
})

```

## License

Licensed under [MIT](./LICENSE).
