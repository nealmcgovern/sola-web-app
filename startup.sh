cd auth-server
npm install bcrypt@latest --save
node app.js &
cd ../frontend
serve -s build