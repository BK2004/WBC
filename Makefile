run:
	npm run build --prefix src/frontend
	npm run build --prefix src/backend
	node src/backend/dist/App.js

install:
	npm i --prefix src/frontend
	npm i --prefix src/backend

clean:
	rm -rf src/backend/dist/* src/frontend/dist/*