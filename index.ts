import { FastifyPluginAsync } from 'fastify'
import * as mqtt from 'async-mqtt'
import { IClientOptions, MqttClient } from 'mqtt'
import fp from 'fastify-plugin'

declare module 'fastify' {
    interface FastifyInstance {
            mqttClient: MqttClient
        }
}

interface Options  {
    url: string,
    opts?: IClientOptions,
    allowRetries?: boolean
}

const fastifyMQTT: FastifyPluginAsync<Options> = async (fastify, options) => {
    try {
        if (fastify.mqttClient) throw new Error('mqtt client has already registered')

        let {url, opts, allowRetries} = options
        let client = await mqtt.connectAsync(url, opts, allowRetries)

        fastify.decorate('mqttClient', client)

        fastify.addHook('onClose', () => client.end())
    } catch (e) {
        fastify.log.error(e)
    }
}

export default fp(fastifyMQTT, {
    fastify: '4.x',
    name: 'fastify-async-mqtt'
  })
export { fastifyMQTT }
