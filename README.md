# bbh

Webbasierte Baumaterial-Berechnungshilfe

## Installation

The easiest way to use this software is by using [Docker](https://www.docker.com). Please install it on your machine.

First, you have to build the docker image by running the following command:

```sh
docker build -t bbh .
```

## Usage

Once the build succeeded, you can start the image by running:

```sh
docker run -it --rm -p 8080:8080 bbh
```

The webservice is now available at <http://localhost:8080>.

It is also possible to provide custom data for the web service. To do that, the data files have to be shared with the docker container. To do that, run the following command:

```sh
docker run -it --rm -p 8080:8080 -v ${PWD}/data:/usr/src/app/data bbh
```

If you want to have direct control over the container, simply append `sh` to the commands above.

## Project Structure

- `backend/` contains the server the serves the webapp and the data through a REST-ful api.
- `data/` holds the data that is served by the backend in data files (mainly `.csv`).
- `docs/` is the place for the project's documentation.
- `frontend/` holds the webapp served the user on the web.
