# Stiva
Stiva adds a data abstraction layer similar to redux, but has a different model for updating and distributing data in the store.

## How to use:
Stiva is build to allow the data in the store to flow to anything that is listening to it. It uses the observer pattern to send out data like so:

```
let stiva = new Stiva();

document.addEventListener('stiva-myStore', (data) => console.log('got the data from myStore!'));

stiva.update('myStore', oldStore => ({newStoreData: 'This will be in the store'}));

// Log: got the data from myStore!

```

## Parts:

### Constructor: `stores = {}, context = document`

The constructor accepts two params, `stores` and `context`.
`stores` defines the default shape of the data so it becomes really easy to pass server values to the instantiation function if needed like so:

```
let render = `<html>
        <head>
            <title>My Silly example</title>
        </head>
        <body>
            <script>
                let stiva = new Stiva(${JSON.stringify(myData)});
            </script>
        </body>
    </html>`;
```

`stores`'s default value is `{}`.

`context` defines the context of the events, it has a default value of `document` but if you wanted to use a different context you could.


### update: `type, store`

The update function is used to update the data. It will run dispatch after update.
`type` is the identifier of the store. It will be used to replace the data in the store and used in the event that gets dispatched.
`store` is a function that returns the new store. The function recieves a paramater that is the current value of the store. This allows you to modify what you need and send back a new object.

Use the update function like so:

```
// Simple example:
stiva.update('myStore', oldStore => ({name: oldStore.name, value: newValue}));

// Simple Example with destructuring
stiva.update('myStore', ({name}) => ({name, value: newValue}));

// A little more complicated
stiva.update('myStore', ({name, value: oldValue}) => {
        let value = oldValue + 42;
        return {
            name,
            value
        };
    } )

// With some object spread goodness if you want it.
stiva.update('myStore', oldStore => ({...oldStore, value: 'only value I want to update.'}))

```

### dispatch: `type`

`dispatch` sends the current data of the specified `type` to all who are listening.


### dispatchAll

`dispatchAll`, you guessed it, dispatches all stores to all listeners.
