import test from 'ava'
import PulseAudio from '../../src/client'

test('PAClient.parseAdress: "tcp:host:port" address parsed correctly', t => {
  const client: PulseAudio = new PulseAudio('tcp:localhost:1234')
  t.deepEqual(client.address, {
    host: 'localhost',
    port: 1234,
    address: 'tcp:localhost:1234',
    protocol: 'tcp'
  })
})

test('PAClient.parseAdress: "tcp:host" address parsed correctly', t => {
  const client: PulseAudio = new PulseAudio('tcp:localhost')
  t.deepEqual(client.address, {
    host: 'localhost',
    port: 4317,
    address: 'tcp:localhost',
    protocol: 'tcp'
  })
})

// test('PAClient.parseAdress: "unix:/path/to/socket" address parsed correctly', t => {
//   const client: PAClient = new PAClient('unix:/run/pulse/pulseaudio.socket')
//   t.deepEqual(client.pulseAddress, {
//     path: '/run/pulse/pulseaudio.socket'
//   })
// })

test('PAClient.parseAdress: "host:port" address parsed correctly', t => {
  const client: PulseAudio = new PulseAudio('localhost:1111')
  t.deepEqual(client.address, {
    host: 'localhost',
    port: 1111,
    address: 'localhost:1111',
    protocol: 'tcp'
  })
})

test('PAClient.parseAddress: "unix:/path" address parsed correctly', t => {
  const client: PulseAudio = new PulseAudio('unix:/to/a/unix.sock')
  t.deepEqual(client.address, {
    path: '/to/a/unix.sock',
    address: 'unix:/to/a/unix.sock',
    protocol: 'unix'
  })
})

test('PAClient.parseAdress: "bad-address" address throws error', t => {
  t.throws(() => {
    const client = new PulseAudio('bad-address')
    console.log(client)
  })
})
