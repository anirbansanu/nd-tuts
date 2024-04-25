const EventEmitter = require('events');

class EventServiceProvider extends EventEmitter {
    constructor() {
        super();
        this.events = {}; // Store registered events
    }

    // Register an event with options like priority and propagation
    register(event, callback, options = { priority: 0, propagate: true }, namespace = 'default') {
        const eventName = `${namespace}.${event}`;
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        const eventObject = { callback, options };
        this.events[eventName].push(eventObject);
        this.emit('eventRegistered', eventName); // Emit a special event for tracking registrations
    }

    // Dispatch an event with options like data and propagation control
    dispatch(event, data = {}, options = { propagate: true }, namespace = 'default') {
        const eventName = `${namespace}.${event}`;
        const eventListeners = this.events[eventName] || [];
        for (const eventObject of eventListeners) {
            const { callback, options: listenerOptions } = eventObject;
            if (options.propagate || listenerOptions.propagate) {
                callback(data);
            }
        }
        this.emit('eventDispatched', eventName); // Emit a special event for tracking dispatches
    }

    // Remove a specific event listener based on the event name and callback function
    removeListener(event, callback, namespace = 'default') {
        const eventName = `${namespace}.${event}`;
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(eventObject => eventObject.callback !== callback);
        }
    }

    // Handle errors for uncaught events
    handleError(event, error) {
        console.error(`Error in event '${event}':`, error);
    }
}

module.exports = EventServiceProvider;
