## EventServiceProvider

This file contains the `EventServiceProvider` class, which extends `EventEmitter` and provides functionality for registering, dispatching, and handling events with options such as priority, propagation, and namespaces.

### Class: EventServiceProvider

#### Constructor

- **Description**: Initializes the `EventServiceProvider` with an empty object to store registered events.

#### Method: register(event, callback, options = { priority: 0, propagate: true }, namespace = 'default')

- **Parameters**:
  - `event` (string): The name of the event to register.
  - `callback` (function): The callback function to execute when the event is dispatched.
  - `options` (object, optional): Event registration options like priority and propagation control.
  - `namespace` (string, optional): Namespace for the event, defaults to 'default'.

- **Description**: Registers an event with the specified callback function and options.
- **Steps**:
  1. Constructs the full event name using the namespace and event name.
  2. Checks if the event already exists in the events object; if not, creates an empty array for it.
  3. Adds the event callback and options to the events object under the constructed event name.
  4. Emits an 'eventRegistered' event for tracking registrations.

#### Method: dispatch(event, data = {}, options = { propagate: true }, namespace = 'default')

- **Parameters**:
  - `event` (string): The name of the event to dispatch.
  - `data` (object, optional): Data to pass to the event callback.
  - `options` (object, optional): Dispatch options like propagation control.
  - `namespace` (string, optional): Namespace for the event, defaults to 'default'.

- **Description**: Dispatches the specified event with optional data and propagation control.
- **Steps**:
  1. Constructs the full event name using the namespace and event name.
  2. Retrieves the event listeners array for the constructed event name.
  3. Iterates through the event listeners and executes the callback functions if propagation is allowed.
  4. Emits an 'eventDispatched' event for tracking dispatches.

#### Method: removeListener(event, callback, namespace = 'default')

- **Parameters**:
  - `event` (string): The name of the event to remove the listener from.
  - `callback` (function): The callback function to remove.
  - `namespace` (string, optional): Namespace for the event, defaults to 'default'.

- **Description**: Removes a specific event listener based on the event name and callback function.

#### Method: handleError(event, error)

- **Parameters**:
  - `event` (string): The name of the event where the error occurred.
  - `error` (Error): The error object.

- **Description**: Handles errors for uncaught events by logging the error with the event name.

### Example Usage:

```javascript
const EventServiceProvider = require('./EventServiceProvider');

const eventProvider = new EventServiceProvider();

// Register an event
eventProvider.register('userLoggedIn', (data) => {
    console.log('User logged in:', data.username);
});

// Dispatch the event
eventProvider.dispatch('userLoggedIn', { username: 'JohnDoe' });

// Remove the event listener
eventProvider.removeListener('userLoggedIn', callbackFunction);

// Handle errors for uncaught events
eventProvider.handleError('userLoggedIn', new Error('User not found'));
```

This Markdown documentation explains the purpose of the `EventServiceProvider` class, its constructor, methods for registering, dispatching, removing event listeners, and handling errors, and provides an example of usage.
