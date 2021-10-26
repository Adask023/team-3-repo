import React from "react";

function Description({ _id, creatorId, description }) {
  // const [description, setDescription] = useState(description);
  const userId = "61671921b7efc009eaf79450";

  return (
    <div>
      <p>Bundle ID: {_id}</p>
      <p>UserId: {userId}</p>
      <p>CreatorId: {creatorId}</p>
      <p>description: {description}</p>
    </div>
  );
}

export default Description;
