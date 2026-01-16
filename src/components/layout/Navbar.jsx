import {
  BellIcon,
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  return (
    <div className="h-20 bg-[#cbd69e] flex items-center justify-between px-6 shadow-sm fixed top-0 left-64 right-0 z-10">
      {/* Search */}
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-96">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search something here..."
          className="bg-transparent outline-none px-3 text-sm w-full"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        {/* Messages */}
        <IconWithBadge icon={<ChatBubbleLeftIcon />} count={18} />

        {/* Notifications */}
        <IconWithBadge icon={<BellIcon />} count={52} />

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-sm">
            <p className="font-semibold">Oda Dink</p>
            <p className="text-gray-400 text-xs">Super Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const IconWithBadge = ({ icon, count }) => (
  <div className="relative cursor-pointer">
    <div className="w-6 h-6 text-gray-600">{icon}</div>
    <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
      {count}
    </span>
  </div>
);

export default Navbar;
