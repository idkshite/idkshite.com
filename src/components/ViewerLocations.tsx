export function ViewerLocations({ flags }: { flags: string[] }) {
  return (
    <div className="opacity-60">
      <em className="block mb-1">idkshite.com already helped readers from:</em>
      <div className="flex gap-2 flex-wrap">
        {flags.map((flag) => {
          return (
            <span
              className="block w-4 h-4 drop-shadow-md rounded-full flex justify-center items-center text-xl"
              key={flag}
            >
              {flag}
            </span>
          );
        })}
      </div>
    </div>
  );
}
