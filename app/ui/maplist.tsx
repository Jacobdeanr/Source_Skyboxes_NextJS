type MapLink = { name: string; url: string };

export default function MapList({ maps }: { maps?: MapLink[] }) {
  if (!maps?.length) return null;
  return (
    <div>
      <h3 className="font-semibold mb-1">Maps featuring this skybox</h3>
      <ul className="list-disc list-inside space-y-0.5 text-sm">
        {maps.map((m) => (
          <li key={m.url}>
            <a href={m.url} target="_blank" className="underline text-blue-300">
              {m.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
