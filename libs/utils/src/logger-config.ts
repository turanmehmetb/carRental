import * as winston from 'winston'
import { format } from 'winston'

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${new Date(timestamp).toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })} - ${level}: ${message}`
})

export function loggerConfig(serviceName: string) {
  const date = new Date();
  return new winston.transports.File({
    filename: serviceName + '.log',
    dirname: `./logs/${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}/`,
    level: 'info',
    handleExceptions: true,
    format: format.combine(format.timestamp(), myFormat),
  })
}
