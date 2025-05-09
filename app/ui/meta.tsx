type Props = {
    author?: string;
    publishDate?: string;
    categories?: string[];
    description?: string;
  };
  
  export default function Meta({
    author,
    publishDate,
    categories,
    description,
  }: Props) {
    return (
      <>
        {description && <p className="text-sm text-neutral-300">{description}</p>}
  
        <ul className="text-sm text-neutral-400 space-y-0.5">
          {author && (
            <li>
              <span className="font-semibold">Author:</span> {author}
            </li>
          )}
          {publishDate && (
            <li>
              <span className="font-semibold">Published:</span> {publishDate}
            </li>
          )}
          {categories?.length && (
            <li>
              <span className="font-semibold">Categories:</span>{' '}
              {categories.join(', ')}
            </li>
          )}
        </ul>
      </>
    );
  }
  