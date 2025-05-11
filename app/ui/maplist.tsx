type MapLink = { name: string; url: string };

export default function MapList({ maps }: { maps?: MapLink[] }) {
  if (!maps?.length)
    return (
      <p className="italic text-neutral-500">No maps featuring this skybox yet.</p>
    );

  return (
    <section>
      <h4 className="mb-2 text-sm font-bold uppercase tracking-wider">
        Community Maps
      </h4>

      <ul className="grid gap-3 sm:grid-cols-2">
        {maps.map((m) => (
          <li key={m.url}>
            <a
              href={m.url}
              target="_blank"
              className="
                group flex items-center justify-between
                rounded-md px-3 py-2
                bg-neutral-800 hover:bg-neutral-700
                transition
              "
            >
              <span className="text-sm text-neutral-100">{m.name}</span>

              {/* external-link arrow */}
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="
                  w-4 h-4 shrink-0
                  fill-neutral-400 group-hover:fill-neutral-200
                  transition
                "
              >
                <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3Z" />
                <path d="M5 5h5V3H3v7h2V5Zm14 14h-5v2h7v-7h-2v5ZM5 19v-5H3v7h7v-2H5Z" />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
