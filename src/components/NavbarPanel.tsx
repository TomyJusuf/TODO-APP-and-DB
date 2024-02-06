export default function NavbarPanel() {
  return (
    <div className="py-2 bg-violet-700 flex justify-center text-white font-bold uppercase ">
      <div className="flex gap-x-2 w-32 ">
        <span className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="h-6"
          >
            <path
              fill="#fafafa"
              d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 96 0z"
            />
          </svg>
        </span>
        <h1 className="text-lg">Todo-app</h1>
      </div>
    </div>
  );
}
