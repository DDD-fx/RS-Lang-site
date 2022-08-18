
/*
export class EventEmitter extends TypedEmitter<EventsType> implements EventEmitterInterface {
    events: EventsType;

    constructor() {
        super();
        this.events = {};
    }

/!*    on(evt: keyof EventsType, listener: (arg: CallbackArgType) => void): EventEmitterInterface {
        (this.events[evt] || (this.events[evt] = [])).push(listener);
        return this;
    }

    emit(evt: keyof EventsType, arg?: CallbackArgType): void {
        (this.events[evt] || []).slice().forEach((lsn) => lsn(arg));
    }*!/
}
*/
