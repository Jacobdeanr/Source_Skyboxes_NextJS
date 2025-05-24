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
              <img src="/Source_Skyboxes_NextJS/icons/maximize.svg" alt="" className="invert w-4 h-4" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
