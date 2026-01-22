# MongoDB Setup Options

## Option 1: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Replace the MONGODB_URI in backend/.env

## Option 2: Install MongoDB locally
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install MongoDB
3. Start MongoDB service:
   ```cmd
   net start MongoDB
   ```
4. Use local connection string in .env:
   ```
   MONGODB_URI=mongodb://localhost:27017/ailern-db
   ```

## Option 3: Use Docker (if you have Docker installed)
```cmd
docker run -d -p 27017:27017 --name mongodb mongo:latest
```