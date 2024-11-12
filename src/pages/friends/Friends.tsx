import { useEffect, useState } from "react";
import axiosInstance from "../../interceptors/Axios";
import { User } from "../../interfaces/User";

export default function Friends() {
  const [friends, setFriends] = useState<User[]>([]);
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axiosInstance.get('friends');
        setFriends(response.data.data);
      } catch (e) {
        
      }
    }

    fetchFriends();
  }, []);

  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            <p>{friend.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}