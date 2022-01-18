import { PA_NATIVE_COMMAND_NAMES } from '.'
import PAPacket from '../packet'
import { PASubscriptionMask } from '../event'
import { SubscribeInfo } from '../types/pulseaudio'

export const subscribe = (requestId: number): PAPacket => {
  const packet: PAPacket = new PAPacket()
  packet.setCommand(PA_NATIVE_COMMAND_NAMES.PA_COMMAND_SUBSCRIBE)
  packet.setRequestId(requestId)
  packet.putU32(PASubscriptionMask.ALL)
  return packet
}

export const subscribeReply = (): SubscribeInfo => {
  return {
    success: true
  }
}
