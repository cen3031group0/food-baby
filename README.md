# FooDaddy: food-baby

Food Baby is a web application for university students. The main purpose of this application will be to provide users with as much access to free food as possible. Food Baby will allow users to see which clubs and events are offering free food on the University of Florida
campus. Food Baby will give users the ability to publish their events with free food for others to see.

## Quickstart

Initialize database

	$ (cd init && node initDB.js)

Start server

	$ node server.js

## API

- Retrieve all events: `GET(/api/events)`
- Retrieve a single event: `GET(/api/events/<event._id>)`
- Save an event: `POST(/api/events)`
- Update an event: `PUT(/api/events/<event._id>)`
- Delete an event: `DELETE(/api/events/<event._id>)`
