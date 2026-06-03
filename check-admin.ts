import dbConnect from "./src/lib/db";
import User from "./src/models/User";

async function checkAdmin() {
  await dbConnect();
  const email = "bulilaniannecarl@gmail.com";
  const user = await User.findOne({ email });

  if (!user) {
    console.log("User not found.");
  } else {
    console.log("User found:", {
      email: user.email,
      hasPassword: !!user.password,
      role: user.role,
      googleId: user.googleId,
    });
  }
  process.exit(0);
}

checkAdmin().catch(console.error);
