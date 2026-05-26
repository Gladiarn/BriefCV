import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

const DB_NAME = "BriefCV";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: MongooseCache | undefined;
}

let cached = global.mongooseConnection;

if (!cached) {
  cached = global.mongooseConnection = {
    conn: null,
    promise: null,
  };
}

async function dbConnect() {
  if (cached?.conn) {
    // Check if the connection is already pointed to the right DB
    if (cached.conn.connection.name === DB_NAME) {
      return cached.conn;
    }
    // If name mismatch (e.g. stayed as 'test'), clear and reconnect
    console.log(
      `[Database] Connection mismatch (found ${cached.conn.connection.name}, expected ${DB_NAME}). Reconnecting...`,
    );
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
      dbName: DB_NAME,
    };

    console.log(`[Database] Connecting to ${DB_NAME}...`);
    cached!.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log(
        `[Database] Successfully connected to: ${mongoose.connection.name}`,
      );
      return mongoose;
    });
  }

  try {
    cached!.conn = (await cached?.promise) || null;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached?.conn;
}

export default dbConnect;
