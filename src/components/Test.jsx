"use client";

import { useSession } from "next-auth/react";

const Test = () => {
  const session = useSession();
  return (
    <div className="border p-6">
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};

export default Test;
