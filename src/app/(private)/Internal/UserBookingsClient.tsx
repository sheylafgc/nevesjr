"use client"; // Indica que este é um Client Component

import { AuthContext } from "@/context/AuthContext/AuthContext";
import { useContext } from "react";
import Internal from "./Internal";

export default function UserBookingsClient() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>No user</div>;
  }

  return <Internal userId={user.id} />;
}
