import axios from "axios";
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Combine all query params into a single string
    const query = Array.from(searchParams.values()).join(" ");

    // 1️⃣ Fetch users
    const users = await User.find({}).lean();

    const formattedUsers = users.map((user: any) => ({
      ...user,
      _id: user._id.toString()
    }));

    // 2️⃣ Call ML API
    const response = await axios.post("http://localhost:8000/search", {
      query,
      users: formattedUsers
    });

    const ranked = response.data.results;

    // 3️⃣ Map results
    const rankedUsers = ranked.map((r: any) =>
      formattedUsers.find((u: any) => u._id === r._id)
    ).filter(Boolean);

    return NextResponse.json(rankedUsers);

  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}








// import axios from "axios";
// import { NextResponse } from "next/server";
// import User from "@/models/User";

// export async function POST(req: Request) {
//   try {
//     const { query } = await req.json();

//     // 1️⃣ Fetch users from MongoDB
//     const users = await User.find({}).lean();

//     // ⚠️ Convert _id to string (VERY IMPORTANT)
//     const formattedUsers = users.map((user: any) => ({
//       ...user,
//       _id: user._id.toString()
//     }));

//     // 2️⃣ Send to ML API
//     const response = await axios.post("http://localhost:8000/search", {
//       query,
//       users: formattedUsers
//     });

//     const ranked = response.data.results;

//     // 3️⃣ Match ranked results with actual users
//    const rankedUsers = ranked.map((r: any) =>
//   formattedUsers.find((u: any) => u._id === r._id)
// ).filter(Boolean);

//     return NextResponse.json(rankedUsers);

//   } catch (error) {
//     console.error("Search error:", error);
//     return NextResponse.json({ error: "Search failed" }, { status: 500 });
//   }
// }



// CODE BEFORE INTREGRATING WITH ML MODEL

// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/User";
// import { NextRequest, NextResponse } from "next/server";

// connect();

// export async function GET(req: NextRequest) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const name = searchParams.get("name") || "";
//         const email = searchParams.get("email") || "";
//         const branch = searchParams.get("branch") || "";
//         const passing_year = searchParams.get("passing_year") || "";
//         const known_skills = searchParams.getAll("known_skills");
//         const career_path = searchParams.getAll("career_path");
//         const experience = searchParams.get("experience") || "";
//         const learning_goal = searchParams.get("learning_goal") || "";
//         const availability = searchParams.get("availability") || "";
//         const isOnboarded = searchParams.get("isOnboarded") || "";
//         const isVerified = searchParams.get("isVerified") || "";

//         // Build MongoDB query
//         const query: any = {};
//         if (name) query.name = { $regex: name, $options: "i" };
//         if (email) query.email = { $regex: email, $options: "i" };
//         if (branch) query.branch = branch;
//         if (passing_year) query.passing_year = parseInt(passing_year);
//         if (known_skills.length) query.known_skills = { $in: known_skills };
//         if (career_path.length) query.career_path = { $in: career_path };
//         if (experience) query.experience = experience === "true";
//         if (learning_goal) query.learning_goal = { $regex: learning_goal, $options: "i" };
//         if (availability) query.availability = availability;
//         if (isOnboarded) query.isOnboarded = isOnboarded === "true";
//         if (isVerified) query.isVerified = isVerified === "true";

//         // Fetch users, excluding sensitive fields
//         const users = await User.find(query).select(
//             "-password -forgotPasswordToken -forgotPasswordTokenExpiry -verifyToken -verifyTokenExpiry"
//         );

//         return NextResponse.json({ success: true, users });
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }