import { CallbackArgType, EventEmitterInterface, EventsType } from '../types/types';

export class EventEmitter implements EventEmitterInterface {
    events: EventsType;

    constructor() {
        this.events = {};
    }

    on(evt: keyof EventsType, listener: (arg: CallbackArgType) => void): EventEmitterInterface {
        (this.events[evt] || (this.events[evt] = [])).push(listener);
        return this;
    }

    emit(evt: keyof EventsType, arg?: CallbackArgType): void {
        (this.events[evt] || []).slice().forEach((lsn) => lsn(arg));
    }
}
