import { useState } from 'react';
import '../styles/navbar.css';
import type { CollectionEntry } from 'astro:content';

type Props = CollectionEntry<'guides'>;

const Navbar = ({ post, guides }: { post: Props; guides: Props[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className={`navbar flex md:hidden`}>
        <button
          className={`hamburger ${isOpen ? 'active' : ''}`}
          id="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className="flex flex-row gap-2">
          {post?.filePath
            ?.split('/')
            .slice(2, -1)
            .map((folder, index) => (
              <>
                <li key={`${folder}-${index}`}>
                  <span>
                    {folder
                      .split(' ')
                      .map(
                        (word) => word.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
                      )
                      .join(' ')}
                  </span>
                </li>
                <li>
                  <span>&gt;</span>
                </li>
              </>
            ))}
          <li>
            <a href={`/guides/${post.slug}`} className="dark:!text-pink-100">{post?.data?.title}</a>
          </li>
        </ul>
      </nav>
      {isOpen && (
        <>
          <div className="md:hidden block h-screen w-full bg-[#173458] fixed z-10 opacity-60"></div>
          <ul className="w-[240px] p-2 m-0 bg-[#61dbfb] dark:bg-[#173458] border-r-2 border-[#113a5b] dark:border-[#3178c6] z-20 block md:hidden h-screen fixed overflow-y-auto">
            {guides.map((post) => (
              <a
                href={`/guides/${post.slug}/`}
                className="!text-[#aa4acf] dark:!text-[#d0a0ff]"
              >
                <li className="text-base">• {post.data.title}</li>
              </a>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Navbar;
