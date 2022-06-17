export function ViewerLocations({ flags }: { flags: string[] }) {
  return (
    <div className="opacity-60">
      <em className="block mb-small">
        idkshite.com already helped readers from:
      </em>
      <div className="flex flex-wrap">
        {flags.map((flag) => {
          return (
            <span
              className="block mr-2 drop-shadow-md rounded-full flex justify-center items-center text-xl"
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
