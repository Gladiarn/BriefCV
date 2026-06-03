import User from "./src/models/User";
import dbConnect from "./src/lib/db";
import { hashPassword } from "./src/services/authService";

async function setupAdmin() {
  await dbConnect();

  const email = "ianne@gmail.com";
  const password = "iicczzbb_123";

  const hashedPassword = await hashPassword(password);

  // Update or create the admin user
  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        password: hashedPassword,
        role: "admin",
        name: "Admin",
      },
    },
    { upsert: true, new: true }, // Create if doesn't exist, update if does
  );

  console.log(
    `Admin user ${updatedUser.email} set up successfully with role ${updatedUser.role}`,
  );
  process.exit(0);
}

setupAdmin().catch(console.error);
