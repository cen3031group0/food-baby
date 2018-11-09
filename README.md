# FooDaddy: food-baby

Food Baby is a web application for university students. The main purpose of this application will be to provide users with as much access to free food as possible. Food Baby will allow users to see which clubs and events are offering free food on the University of Florida
campus. Food Baby will give users the ability to publish their events with free food for others to see.

## Quickstart

Initialize databases

	$ (cd init_db && node init_events_db.js && node init_users_db.js)

Start server

	$ node server.js

## API

### Events

- Retrieve all events: `GET(/api/events)`
- Retrieve a single event: `GET(/api/events/<event._id>)`
- Save an event: `POST(/api/events)`
- Update an event: `PUT(/api/events/<event._id>)`
- Delete an event: `DELETE(/api/events/<event._id>)`

### Users

- Retrieve all users: `GET(/api/users)`
- Retrieve a single user: `GET(/api/users/<user._id>)`
- Save a user: `POST(/api/users)`
- Update a user: `PUT(/api/users/<user._id>)`
- Delete a user: `DELETE(/api/users/<user._id>)`
