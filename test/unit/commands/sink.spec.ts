import test from 'ava'
import { loadFixture, Dictionary, Fixture } from '../fixtures'
import { GetSink, GetSinkList, SetSinkVolume } from '../../../src/commands/sink'
import { PA_PROTOCOL_MINIMUM_VERSION } from '../../../src/protocol'
import PAPacket from '../../../src/packet'
import { JSONParse, JSONStringify } from '../../../src/utils/bigInt'

const fixtures: Dictionary<Fixture> = {}
const fxToLoad = [
  'sink'
]

test.before(async _t => {
  for (const fx of fxToLoad) {
    fixtures[fx] = await loadFixture(fx)
  }
})

// GetSink
test('GetSink query', t => {
  const f = fixtures.sink.getSink
  const [requestId, sinkIndex] = f.queryParameters
  t.is(GetSink.query(requestId, sinkIndex).write().toString('hex'), f.queryBuffer)
})

test('GetSink reply', t => {
  const f = fixtures.sink.getSink
  const packet = new PAPacket(Buffer.from(f.replyBuffer, 'hex'))
  t.deepEqual(GetSink.reply(packet, PA_PROTOCOL_MINIMUM_VERSION), JSONParse(JSONStringify(f.replyObject)))
})

// GetSinkList
test('GetSinkList query', t => {
  const f = fixtures.sink.getSinkList
  const [requestId] = f.queryParameters
  t.is(GetSinkList.query(requestId).write().toString('hex'), f.queryBuffer)
})

test('GetSinkList reply', t => {
  const f = fixtures.sink.getSinkList
  const packet = new PAPacket(Buffer.from(f.replyBuffer, 'hex'))
  t.deepEqual(GetSinkList.reply(packet, PA_PROTOCOL_MINIMUM_VERSION), JSONParse(JSONStringify(f.replyObject)))
})

// SetSinkVolume
test('SetSinkVolume query', t => {
  const f = fixtures.sink.setSinkVolume
  const [requestId, sinkIndex, sinkVolume] = f.queryParameters
  t.is(SetSinkVolume.query(requestId, sinkIndex, sinkVolume).write().toString('hex'), f.queryBuffer)
})

test('SetSinkVolume reply', t => {
  const f = fixtures.sink.setSinkVolume
  const packet = new PAPacket(Buffer.from(f.replyBuffer, 'hex'))
  t.deepEqual(SetSinkVolume.reply(packet, PA_PROTOCOL_MINIMUM_VERSION), JSONParse(JSONStringify(f.replyObject)))
})
