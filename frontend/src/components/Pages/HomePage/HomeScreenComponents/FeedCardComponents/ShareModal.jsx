import { X } from "lucide-react";

const ShareModal = ({ onClose }) => {
  // TEMP: connections from database
  const connectionsFromDB = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Frontend Developer",
      avatar: "https://i.pravatar.cc/40?img=11",
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Backend Engineer",
      avatar: "https://i.pravatar.cc/40?img=12",
    },
    {
      id: 3,
      name: "Charlie Brown",
      role: "Product Designer",
      avatar: "https://i.pravatar.cc/40?img=13",
    },
        {
      id: 1,
      name: "Alice Johnson",
      role: "Frontend Developer",
      avatar: "https://i.pravatar.cc/40?img=11",
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Backend Engineer",
      avatar: "https://i.pravatar.cc/40?img=12",
    },
    {
      id: 3,
      name: "Charlie Brown",
      role: "Product Designer",
      avatar: "https://i.pravatar.cc/40?img=13",
    },
        {
      id: 1,
      name: "Alice Johnson",
      role: "Frontend Developer",
      avatar: "https://i.pravatar.cc/40?img=11",
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Backend Engineer",
      avatar: "https://i.pravatar.cc/40?img=12",
    },
    {
      id: 3,
      name: "Charlie Brown",
      role: "Product Designer",
      avatar: "https://i.pravatar.cc/40?img=13",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-2"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-sm font-semibold">Send this post</h2>
          <X
            size={18}
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Write a message (optional)"
            className="
              w-full border border-gray-300 rounded-md
              px-3 py-2 text-sm
              focus:outline-none focus:ring-1 focus:ring-[#0A66C2]
            "
          />
        </div>
        <div className="max-h-72 overflow-y-auto">
          {connectionsFromDB.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-100"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>

              <button
                onClick={() => console.log("Shared with:", user.name)}
                className="text-sm text-[#0A66C2] font-medium hover:underline"
              >
                Send
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
