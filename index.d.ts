import { FastifyPluginAsync } from 'fastify';
import { IClientOptions, MqttClient } from 'mqtt';
declare module 'fastify' {
    interface FastifyInstance {
        mqttClient: MqttClient;
    }
}
interface Options {
    url: string;
    opts?: IClientOptions;
    allowRetries?: boolean;
}
declare const fastifyMQTT: FastifyPluginAsync<Options>;
declare const _default: FastifyPluginAsync<Options, import("fastify").RawServerDefault, import("fastify").FastifyTypeProviderDefault>;
export default _default;
export { fastifyMQTT };
